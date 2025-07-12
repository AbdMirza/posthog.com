import React, { useState, useEffect, useRef } from 'react'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Accordion } from '../RadixUI/Accordion'
import { ToggleOption } from 'components/RadixUI/ToggleGroup'
import { IconInfo, IconGear } from '@posthog/icons'
import PresentationMode from './FullScreen'
import { motion } from 'framer-motion'
import { navigate } from 'gatsby'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface PresentationProps {
    template: 'generic' | 'product' | 'feature'
    slug: string
    title: string
    accentImage?: React.ReactNode
    sidebarContent?: React.ReactNode | AccordionItem[] | ((activeSlideIndex: number) => React.ReactNode)
    children?: React.ReactNode
    fullScreen?: boolean
    slides?: Array<{
        name: string
        slug: string
        content: React.ReactNode
        rawContent?: React.ReactNode
        thumbnailContent?: React.ReactNode
    }>
    slideId?: string
    presenterNotes?: Record<string, string>
}

const SidebarContent = ({
    content,
    activeSlideIndex,
}: {
    content: React.ReactNode | AccordionItem[] | ((activeSlideIndex: number) => React.ReactNode)
    activeSlideIndex: number
}): React.ReactElement | null => {
    if (!content) return null

    if (typeof content === 'function') {
        return <>{content(activeSlideIndex)}</>
    }

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

export default function Presentation({
    accentImage,
    sidebarContent,
    children,
    fullScreen = false,
    slides = [],
    slideId,
    presenterNotes,
}: PresentationProps) {
    const [isNavVisible, setIsNavVisible] = useState<boolean>(true)
    const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)
    const [drawerHeight, setDrawerHeight] = useState<number>(80)
    const [lastOpenHeight, setLastOpenHeight] = useState<number>(80)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [dragStartHeight, setDragStartHeight] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible)
    }

    const toggleDrawer = () => {
        if (isDrawerOpen) {
            // Closing: save current height (only if it's reasonable)
            if (drawerHeight >= 10) {
                setLastOpenHeight(drawerHeight)
            }
            setIsDrawerOpen(false)
        } else {
            // Opening: restore last height, but ensure it's reasonable
            const heightToRestore = lastOpenHeight >= 25 ? lastOpenHeight : 80
            setDrawerHeight(heightToRestore)
            setIsDrawerOpen(true)
        }
    }

    const handleVerticalDrag = (_event: any, info: any) => {
        if (!containerRef.current || !isDrawerOpen) return
        const containerHeight = containerRef.current.getBoundingClientRect().height
        const newDrawerHeight = Math.min(Math.max(dragStartHeight - info.offset.y, 0), 300)
        setDrawerHeight(newDrawerHeight)

        // Update lastOpenHeight for reasonable heights only
        if (newDrawerHeight >= 10) {
            setLastOpenHeight(newDrawerHeight)
        }
    }

    const getCurrentSlideNotes = () => {
        if (!presenterNotes || !slides || slides.length === 0) return ''
        const currentSlide = slides[activeSlideIndex]
        if (!currentSlide) return ''
        return presenterNotes[currentSlide.slug] || ''
    }

    // Handle initial hash navigation on page load
    useEffect(() => {
        if (slides.length === 0) return

        const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
        if (hash) {
            const slideIndex = slides.findIndex((slide) => slide.slug === hash)
            if (slideIndex !== -1) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    const slideSelector = slideId
                        ? `[data-slide-id="${slideId}"][data-slide="${slideIndex}"]`
                        : `[data-slide="${slideIndex}"]`
                    const slideElement = document.querySelector(slideSelector)

                    if (slideElement) {
                        slideElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                }, 100)
            }
        }
    }, [slides, slideId])

    // Update URL hash when active slide changes
    useEffect(() => {
        if (slides.length === 0) return

        const currentSlide = slides[activeSlideIndex]
        if (!currentSlide) return

        // Don't add hash for overview slide (first slide)
        if (activeSlideIndex === 0 || currentSlide.slug === 'overview') {
            if (typeof window !== 'undefined' && window.location.hash) {
                navigate(window.location.pathname, { replace: true })
            }
        } else {
            if (typeof window !== 'undefined') {
                const newHash = `#${currentSlide.slug}`
                if (window.location.hash !== newHash) {
                    navigate(`${window.location.pathname}${newHash}`, { replace: true })
                }
            }
        }
    }, [activeSlideIndex, slides])

    // Set up scroll-based detection to track active slide
    useEffect(() => {
        if (slides.length === 0) return

        const scrollContainerSelector = slideId
            ? `[data-presentation-id="${slideId}"] [data-radix-scroll-area-viewport]`
            : '[data-app="Presentation"] [data-radix-scroll-area-viewport]'
        const scrollContainer = document.querySelector(scrollContainerSelector)
        if (!scrollContainer) return

        const handleScroll = () => {
            const containerRect = scrollContainer.getBoundingClientRect()
            const containerTop = containerRect.top
            const containerBottom = containerRect.bottom

            let bestSlideIndex = 0
            let maxVisibleArea = 0

            // Check each slide to find which has the most visible area
            const slideSelector = slideId ? `[data-slide-id="${slideId}"][data-slide]` : '[data-slide]'
            const slideElements = document.querySelectorAll(slideSelector)
            slideElements.forEach((slideElement, index) => {
                const slideRect = slideElement.getBoundingClientRect()

                // Calculate visible area of this slide
                const visibleTop = Math.max(slideRect.top, containerTop)
                const visibleBottom = Math.min(slideRect.bottom, containerBottom)
                const visibleHeight = Math.max(0, visibleBottom - visibleTop)
                const visibleArea = visibleHeight * slideRect.width

                // If this slide has more visible area, it should be active
                if (visibleArea > maxVisibleArea) {
                    maxVisibleArea = visibleArea
                    bestSlideIndex = index
                }
            })

            setActiveSlideIndex(bestSlideIndex)
        }

        // Initial check
        handleScroll()

        // Listen for scroll events
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [slides.length, slideId])

    const enterPresentationMode = () => {
        // Use the currently active slide index instead of searching for visible slide
        if (slides.length > 0) {
            setCurrentSlideIndex(activeSlideIndex)
        }
        setIsPresentationMode(true)
    }

    const exitPresentationMode = () => {
        setIsPresentationMode(false)
    }

    return (
        <>
            <div ref={containerRef} className="@container w-full h-full flex flex-col min-h-1">
                <div
                    data-scheme="secondary"
                    className={`flex flex-grow min-h-0 ${fullScreen ? 'border-t border-primary' : ''}`}
                >
                    {sidebarContent && (
                        <aside
                            data-scheme="secondary"
                            className={`${
                                isNavVisible ? 'w-48' : 'w-0'
                            } transition-all duration-300 bg-primary border-r border-primary h-full overflow-hidden`}
                        >
                            <ScrollArea className="p-2">
                                <div className="space-y-3">
                                    <SidebarContent content={sidebarContent} activeSlideIndex={activeSlideIndex} />
                                </div>
                            </ScrollArea>
                        </aside>
                    )}
                    <main
                        data-app="Presentation"
                        data-presentation-id={slideId}
                        data-scheme="secondary"
                        className="@container flex-1 flex flex-col bg-primary relative h-full"
                    >
                        {!fullScreen && (
                            <>
                                <HeaderBar
                                    showSidebar
                                    showSearch
                                    isNavVisible={isNavVisible}
                                    onToggleNav={toggleNav}
                                    showFullScreen
                                    showDrawerToggle
                                    isDrawerOpen={isDrawerOpen}
                                    onToggleDrawer={toggleDrawer}
                                    exportToPdf
                                    slideId={slideId}
                                    onFullScreenClick={slides.length > 0 ? enterPresentationMode : undefined}
                                />
                            </>
                        )}
                        {fullScreen ? (
                            children
                        ) : (
                            <>
                                <div className="min-h-0 flex-1">
                                    <ScrollArea className="h-full flex-1 border-t border-primary">
                                        {accentImage && (
                                            <div className="absolute right-0 top-6">
                                                <div className="relative max-w-md @4xl:max-w-lg @5xl:max-w-xl @6xl:max-w-2xl transition-all duration-700 ease-out opacity-25 @xl:opacity-50">
                                                    {accentImage}
                                                    <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_0%,transparent)]" />
                                                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="relative">{children}</div>
                                    </ScrollArea>
                                </div>
                                <div
                                    data-scheme="primary"
                                    className={`flex-none relative bg-primary border-t border-primary overflow-hidden ${
                                        !isDragging ? 'transition-all duration-200 ease-out' : ''
                                    }`}
                                    style={{
                                        height: isDrawerOpen ? drawerHeight : 0,
                                        maxHeight: 300,
                                        minHeight: 0,
                                    }}
                                >
                                    <motion.div
                                        data-scheme="tertiary"
                                        className={`h-1.5 top-0 left-0 !transform-none absolute z-20 w-full ${
                                            isDrawerOpen
                                                ? 'cursor-ns-resize hover:bg-accent active:bg-accent'
                                                : 'pointer-events-none'
                                        }`}
                                        drag={isDrawerOpen ? 'y' : false}
                                        dragMomentum={false}
                                        dragConstraints={{ top: 0, bottom: 0 }}
                                        onDragStart={() => {
                                            if (isDrawerOpen) {
                                                setIsDragging(true)
                                                setDragStartHeight(drawerHeight)
                                            }
                                        }}
                                        onDragEnd={() => {
                                            setIsDragging(false)
                                            // Auto-close if dragged to near-zero height
                                            if (drawerHeight <= 5) {
                                                setIsDrawerOpen(false)
                                                // Ensure we have a reasonable height for reopening
                                                if (lastOpenHeight < 10) {
                                                    setLastOpenHeight(80)
                                                }
                                            }
                                        }}
                                        onDrag={handleVerticalDrag}
                                    />
                                    <ScrollArea className="h-full">
                                        <div className="p-4 text-sm">
                                            {getCurrentSlideNotes() ? (
                                                <div dangerouslySetInnerHTML={{ __html: getCurrentSlideNotes() }} />
                                            ) : (
                                                'No presenter notes for this slide.'
                                            )}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>

            {/* Presentation Mode Portal - renders outside AppWindow */}
            {isPresentationMode && slides.length > 0 && (
                <PresentationMode slides={slides} onExit={exitPresentationMode} initialSlideIndex={currentSlideIndex} />
            )}
        </>
    )
}
