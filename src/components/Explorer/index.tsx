import React from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { useWindow } from '../../context/Window'
import { getProseClasses } from '../../constants'
import AddressBar from 'components/OSChrome/AddressBar'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface ExplorerProps {
    template: 'generic' | 'product' | 'feature'
    slug: string
    title?: string
    accentImage?: React.ReactNode
    leftSidebarContent?: React.ReactNode | AccordionItem[]
    rightSidebarContent?: React.ReactNode | AccordionItem[]
    children?: React.ReactNode
    fullScreen?: boolean
    showTitle?: boolean
    padding?: boolean
    headerBarOptions?: string[]
    selectOptions?: any[]
    onCategoryChange?: (category: string) => void
    selectedCategory?: string
    cartHandlers?: {
        onCartOpen: () => void
        onCartClose: () => void
        isCartOpen: boolean
    }
}

const SidebarContent = ({ content }: { content: React.ReactNode | AccordionItem[] }): JSX.Element | null => {
    if (!content) return null

    if (Array.isArray(content)) {
        return (
            <>
                {content.map((item, index) => (
                    <Accordion
                        key={index}
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        items={[
                            {
                                trigger: item.title,
                                content: item.content,
                            },
                        ]}
                    />
                ))}
            </>
        )
    }

    return <>{content}</>
}

export default function Explorer({
    template,
    slug,
    title,
    accentImage,
    leftSidebarContent,
    rightSidebarContent,
    children,
    fullScreen = false,
    showTitle = true,
    padding = true,
    headerBarOptions,
    selectOptions = [],
    onCategoryChange,
    selectedCategory,
    cartHandlers,
}: ExplorerProps) {
    const { appWindow } = useWindow()
    const currentPath = appWindow?.path?.replace(/^\//, '') || '' // Remove leading slash, default to empty string

    const handleValueChange = (value: string) => {
        if (onCategoryChange) {
            // Use custom category change handler for filtering
            onCategoryChange(value)
        } else {
            // Fall back to navigation for regular cases
            navigate(`/${value}`)
        }
    }

    // Generate dynamic HeaderBar props based on headerBarOptions
    const getHeaderBarProps = () => {
        const props: any = {}
        if (headerBarOptions) {
            headerBarOptions.forEach((option) => {
                props[option] = true
            })
        } else {
            // Default props if no options specified
            props.showBack = true
            props.showForward = true
            props.showSearch = true
        }

        // Add cart handlers if provided
        if (cartHandlers) {
            props.onCartOpen = cartHandlers.onCartOpen
            props.onCartClose = cartHandlers.onCartClose
            props.isCartOpen = cartHandlers.isCartOpen
        }

        return props
    }

    const ContentWrapper = appWindow?.size?.width && appWindow.size.width <= 768 ? ScrollArea : React.Fragment

    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
            {!fullScreen && (
                <>
                    <HeaderBar {...getHeaderBarProps()} />
                    <AddressBar
                        selectOptions={selectOptions}
                        currentPath={currentPath}
                        handleValueChange={handleValueChange}
                        selectedCategory={selectedCategory}
                    />
                </>
            )}
            {/* <DebugContainerQuery /> */}
            <ContentWrapper>
                <div
                    data-scheme="secondary"
                    className={`flex flex-col @3xl:flex-row-reverse flex-grow min-h-0 ${
                        fullScreen ? 'border-t border-primary' : ''
                    }`}
                >
                    {rightSidebarContent && (
                        <aside
                            data-scheme="secondary"
                            className="not-prose w-96 bg-primary border-l border-primary h-full text-primary"
                        >
                            <div className="h-full flex flex-col">
                                <div className="flex-1 overflow-auto">
                                    <SidebarContent content={rightSidebarContent} />
                                </div>
                            </div>
                        </aside>
                    )}
                    <main
                        data-app="Explorer"
                        data-scheme="primary"
                        className="@container flex-1 bg-primary relative h-full"
                    >
                        {fullScreen ? (
                            children
                        ) : (
                            <ScrollArea className="h-full">
                                {/* <DebugContainerQuery /> */}
                                {accentImage && (
                                    <div className="absolute right-0 top-6">
                                        <div className="relative max-w-md @4xl:max-w-lg @5xl:max-w-xl @6xl:max-w-2xl transition-all duration-700 ease-out opacity-25 @xl:opacity-50">
                                            {accentImage}
                                            <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_0%,transparent)]" />
                                            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`${getProseClasses()} max-w-none h-full ${
                                        padding ? 'relative p-4' : ''
                                    }`}
                                >
                                    {!fullScreen && showTitle && <h1>{title}</h1>}
                                    {children}
                                </div>
                            </ScrollArea>
                        )}
                    </main>
                    {leftSidebarContent && (
                        <aside data-scheme="secondary" className="w-64 bg-primary border-r border-primary h-full">
                            <ScrollArea className="p-2">
                                <div className="space-y-3">
                                    <SidebarContent content={leftSidebarContent} />
                                </div>
                            </ScrollArea>
                        </aside>
                    )}
                </div>
            </ContentWrapper>
        </div>
    )
}
