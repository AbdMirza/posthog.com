import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import useInkeepSettings, { defaultQuickQuestions } from './useInkeepSettings'
import Chat from 'components/Chat'

interface ChatContextType {
    hasUnread: boolean
    setHasUnread: (unread: boolean) => void
    loading: boolean
    renderChat: () => void
    setQuickQuestions: (questions: string[]) => void
    conversationHistory: { id: string; question: number; date: string }[]
    resetConversationHistory: () => void
    EmbeddedChat: any
    aiChatSettings: any
    baseSettings: any
    context: { type: 'page'; value: { path: string; label: string } }[]
    setContext: (context: { type: 'page'; value: { path: string; label: string } }[]) => void
    addContext: (newContext: { type: 'page'; value: { path: string; label: string } }) => void
    firstResponse: string | null
    setConversationId: (id: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({
    context: initialContext,
    quickQuestions: initialQuickQuestions,
    chatId,
}: {
    context?: { type: 'page'; value: { path: string; label: string } }[]
    quickQuestions?: string[]
    chatId?: string
}): JSX.Element {
    const { baseSettings, aiChatSettings, setBaseSettings, setAiChatSettings } = useInkeepSettings()
    const [hasUnread, setHasUnread] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)
    const [quickQuestions, setQuickQuestions] = useState(initialQuickQuestions || defaultQuickQuestions)
    const [conversationHistory, setConversationHistory] = useState<{ id: string; question: number; date: string }[]>([])
    const [context, setContext] = useState<{ type: 'page'; value: { path: string; label: string } }[]>([])
    const [EmbeddedChat, setEmbeddedChat] = useState<any>()
    const [firstResponse, setFirstResponse] = useState<string | null>(null)
    const conversationStartedDate = useMemo(() => new Date().toISOString(), [])

    const logEventCallback = useCallback(
        (event: any) => {
            if (event?.eventName === 'user_message_submitted' && !firstResponse) {
                setFirstResponse(
                    event.properties.conversation.messages.filter((m: any) => m.role === 'user')[0].content
                )
            }
            if (event?.eventName === 'assistant_message_received') {
                if (!hasFirstResponse) {
                    setHasFirstResponse(true)
                }
            }
            if (event?.eventName === 'chat_share_button_clicked') {
                const conversationId = event?.properties?.sharedConversationId
                if (conversationId) {
                    try {
                        const newConversation = {
                            id: conversationId,
                            question: event.properties.conversation.messages[0].content,
                            date: conversationStartedDate,
                        }
                        const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
                        localStorage.setItem(
                            'conversations',
                            JSON.stringify([
                                ...conversations.filter((c: any) => c.date !== conversationStartedDate),
                                newConversation,
                            ])
                        )
                    } catch (error) {
                        console.error('Error adding conversation to history:', error)
                    }
                }
            }
        },
        [hasFirstResponse]
    )

    const addContext = (newContext: { type: 'page'; value: { path: string; label: string } }) => {
        if (newContext && !context.some((c) => c.value.path === newContext.value.path)) {
            setContext((prev) => [...prev, newContext])
        }
    }

    const renderChat = async () => {
        try {
            const { InkeepEmbeddedChat } = await import('@inkeep/cxkit-react')
            setEmbeddedChat(() => InkeepEmbeddedChat)
        } catch (error) {
            console.error('Failed to load EmbeddedChat:', error)
        }
    }

    const resetConversationHistory = () => {
        setConversationHistory([])
        localStorage.removeItem('conversations')
    }

    useEffect(() => {
        renderChat()
        const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
        setConversationHistory(conversations)
    }, [])

    useEffect(() => {
        // Add community suggestion to chat
        if (hasFirstResponse) {
            const shadowRoot = document.querySelector('#embedded-chat-target>div')?.shadowRoot
            if (shadowRoot) {
                const chatBubbleActions = shadowRoot.querySelector('.ikp-ai-chat-message-toolbar')
                if (chatBubbleActions) {
                    const el = document.createElement('p')
                    el.classList.add('community-suggestion')
                    el.innerHTML = `<strong style="display: block; font-size: .933rem;">Not the answer you were looking for?</strong> Try <a target="_blank" style="text-decoration: underline;" href="/questions"><strong>posting a community question</strong></a> and humans may respond!`
                    chatBubbleActions.insertAdjacentElement('afterend', el)
                }
            }
        }
    }, [hasFirstResponse])

    useEffect(() => {
        setBaseSettings({
            ...baseSettings,
            onEvent: logEventCallback,
        })
    }, [])

    useEffect(() => {
        const prompts = context.map((c) =>
            c.type === 'page' ? `The user is currently viewing the page ${c.value.label} at ${c.value.path}` : ``
        )
        setAiChatSettings({
            ...aiChatSettings,
            prompts,
        })
    }, [context])

    useEffect(() => {
        setAiChatSettings({
            ...aiChatSettings,
            exampleQuestions: quickQuestions,
        })
    }, [quickQuestions])

    const setConversationId = (id: string) => {
        setAiChatSettings({
            ...aiChatSettings,
            chatId: id,
        })
    }

    useEffect(() => {
        if (chatId) {
            setAiChatSettings({
                ...aiChatSettings,
                chatId,
            })
        }
    }, [chatId])

    useEffect(() => {
        if (initialContext) {
            initialContext.forEach((c) => addContext(c))
        }
    }, [initialContext])

    return (
        <ChatContext.Provider
            value={{
                hasUnread,
                setHasUnread,
                loading,
                renderChat,
                setQuickQuestions,
                conversationHistory,
                resetConversationHistory,
                EmbeddedChat,
                aiChatSettings,
                baseSettings,
                context,
                setContext,
                addContext,
                firstResponse,
                setConversationId,
            }}
        >
            <Chat />
        </ChatContext.Provider>
    )
}

export function useChat(): ChatContextType {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}
