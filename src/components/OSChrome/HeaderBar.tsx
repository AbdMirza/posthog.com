import React, { useMemo, useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import OSButton from 'components/OSButton'
import {
    IconHome,
    IconSidebarOpen,
    IconSidebarClose,
    IconChevronLeft,
    IconChevronRight,
    IconSearch,
    IconBook,
    IconTableOfContents,
    IconPlay,
    IconBookmark,
    IconBookmarkSolid,
    IconBottomPanel,
} from '@posthog/icons'
import { IconPDF } from 'components/OSIcons'
import { useWindow } from '../../context/Window'
import SearchBar from 'components/Editor/SearchBar'
import Tooltip from 'components/RadixUI/Tooltip'
import Toast from 'components/RadixUI/Toast'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import Link from 'components/Link'
import { useCartStore } from '../../templates/merch/store'
import { exportToPdf as exportPresentationToPdf } from '../../lib/exportToPdf'
import Loading from 'components/Loading'

interface HeaderBarProps {
    isNavVisible?: boolean
    isTocVisible?: boolean
    onToggleNav?: () => void
    onToggleToc?: () => void
    showBack?: boolean
    showForward?: boolean
    showSearch?: boolean
    showToc?: boolean
    showSidebar?: boolean
    hasLeftSidebar?: boolean
    showFullScreen?: boolean
    showCart?: boolean
    onFullScreenClick?: () => void
    rightActionButtons?: React.ReactNode
    searchContentRef?: React.RefObject<HTMLElement>
    homeURL?: string
    bookmark?: {
        title: string
        description: string
    }
    onSearch?: (search: string) => void
    // Cart handlers (optional for backwards compatibility)
    onCartOpen?: () => void
    onCartClose?: () => void
    isCartOpen?: boolean
    exportToPdf?: boolean
    slideId?: string
    showDrawerToggle?: boolean
    isDrawerOpen?: boolean
    onToggleDrawer?: () => void
}

export default function HeaderBar({
    isNavVisible,
    isTocVisible,
    onToggleNav,
    onToggleToc,
    showBack = false,
    showForward = false,
    showSearch = false,
    showToc = false,
    showSidebar = false,
    hasLeftSidebar = false,
    showFullScreen = false,
    showCart = false,
    onFullScreenClick,
    rightActionButtons,
    searchContentRef,
    homeURL,
    bookmark,
    onSearch,
    onCartOpen,
    onCartClose,
    isCartOpen = false,
    exportToPdf = false,
    slideId,
    showDrawerToggle = false,
    isDrawerOpen = false,
    onToggleDrawer,
}: HeaderBarProps) {
    const { user, addBookmark, removeBookmark } = useUser()
    const { openSignIn } = useApp()
    const { goBack, goForward, canGoBack, canGoForward, appWindow } = useWindow()
    const [searchOpen, setSearchOpen] = useState(false)
    const [animateCartCount, setAnimateCartCount] = useState(false)
    const [isExportingPdf, setIsExportingPdf] = useState(false)
    const count = useCartStore((state) => state.count)
    const isBookmarked = useMemo(
        () => typeof window !== 'undefined' && user?.profile?.bookmarks?.some((b) => b.url === appWindow?.path),
        [user, appWindow?.path]
    )

    // Animate cart count when it changes
    useEffect(() => {
        if (count && count > 0) {
            setAnimateCartCount(true)
            const timer = setTimeout(() => {
                setAnimateCartCount(false)
            }, 600) // Duration of wiggle animation
            return () => clearTimeout(timer)
        }
    }, [count])

    const toggleSearch = () => {
        setSearchOpen(!searchOpen)
    }

    const handleCartClick = () => {
        if (isCartOpen) {
            onCartClose?.()
        } else {
            onCartOpen?.()
        }
    }

    const handleBookmark = async (add: boolean) => {
        if (!user) {
            openSignIn()
            return
        }

        if (bookmark && appWindow?.path) {
            if (add) {
                await addBookmark({ ...bookmark, url: appWindow.path })
            } else {
                await removeBookmark({ ...bookmark, url: appWindow.path })
            }
        }
    }

    return (
        <>
            <div data-scheme="secondary" className="bg-primary flex w-full gap-px p-2 flex-shrink-0">
                <div>
                    <motion.div
                        className={`flex-shrink-0 overflow-hidden flex items-center gap-px transition-all min-w-0 ${
                            hasLeftSidebar && isNavVisible ? '@2xl:min-w-[250px]' : 'w-auto'
                        }`}
                    >
                        {homeURL && <OSButton variant="ghost" icon={<IconHome />} to={homeURL} asLink />}
                        <div className="hidden @2xl:block">
                            {hasLeftSidebar && (
                                <OSButton
                                    onClick={onToggleNav}
                                    variant="ghost"
                                    active={isNavVisible}
                                    icon={isNavVisible ? <IconSidebarOpen /> : <IconSidebarClose />}
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
                <div className="flex-grow flex justify-between items-center">
                    <div className="flex items-center gap-px">
                        {showBack && (
                            <OSButton
                                disabled={!canGoBack}
                                onClick={goBack}
                                variant="ghost"
                                icon={<IconChevronLeft />}
                            />
                        )}
                        {showForward && (
                            <OSButton
                                disabled={!canGoForward}
                                onClick={goForward}
                                variant="ghost"
                                icon={<IconChevronRight />}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-px relative">
                        {rightActionButtons}
                        {showSearch && (searchContentRef || onSearch) && (
                            <Tooltip
                                trigger={<OSButton variant="ghost" icon={<IconSearch />} onClick={toggleSearch} />}
                            >
                                Search this page
                            </Tooltip>
                        )}
                        {showCart && (
                            <Tooltip
                                trigger={
                                    <OSButton
                                        variant="ghost"
                                        onClick={handleCartClick}
                                        className="relative"
                                        active={isCartOpen}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 fill-current"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1 2.75A.75.75 0 0 1 1.75 2h.93a1.75 1.75 0 0 1 1.716 1.407L4.715 5h15.553a1.75 1.75 0 0 1 1.712 2.11l-1.579 7.5A1.75 1.75 0 0 1 18.69 16H6.819a1.75 1.75 0 0 1-1.715-1.407L2.925 3.701A.25.25 0 0 0 2.68 3.5h-.93A.75.75 0 0 1 1 2.75ZM5.015 6.5l1.56 7.799a.25.25 0 0 0 .245.201h11.869a.25.25 0 0 0 .244-.198l1.58-7.5a.25.25 0 0 0-.245-.302H5.015ZM8 18.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM6 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm11-.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm-2 .5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {count && count > 0 && (
                                            <span
                                                className={`absolute -top-1 -right-1 bg-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold ${
                                                    animateCartCount ? 'animate-wiggle' : ''
                                                }`}
                                            >
                                                {count}
                                            </span>
                                        )}
                                    </OSButton>
                                }
                            >
                                Shopping cart ({count || 0})
                            </Tooltip>
                        )}
                        {bookmark?.title && bookmark?.description && (
                            <Tooltip
                                trigger={
                                    <OSButton
                                        variant="ghost"
                                        icon={isBookmarked ? <IconBookmarkSolid /> : <IconBookmark />}
                                        onClick={() => handleBookmark(!isBookmarked)}
                                    />
                                }
                            >
                                {isBookmarked ? 'Remove from bookmarks' : 'Bookmark this page'}
                            </Tooltip>
                        )}
                        {showSearch && (searchContentRef || onSearch) && (
                            <SearchBar
                                contentRef={searchContentRef}
                                visible={searchOpen}
                                onClose={toggleSearch}
                                onSearch={onSearch}
                                dataScheme="secondary"
                                className="-bottom-2 right-4 translate-y-full bg-primary"
                            />
                        )}
                    </div>
                </div>
                {showSidebar && (
                    <motion.div
                        className={`flex-shrink-0 flex justify-end transition-all min-w-0 ${
                            isTocVisible ? '@4xl:min-w-[250px]' : 'w-auto'
                        }`}
                        animate={isTocVisible ? 'open' : 'closed'}
                    >
                        {showToc && (
                            <div className="hidden @4xl:block [&>span]:inline-block">
                                <Tooltip
                                    trigger={
                                        <OSButton
                                            variant="ghost"
                                            icon={<IconTableOfContents />}
                                            active={isTocVisible}
                                            onClick={onToggleToc}
                                        />
                                    }
                                >
                                    {isTocVisible ? 'Hide' : 'Show'} table of contents
                                </Tooltip>
                            </div>
                        )}
                    </motion.div>
                )}
                <div className="flex items-center gap-1">
                    {showDrawerToggle && (
                        <Tooltip
                            trigger={
                                <OSButton
                                    variant="ghost"
                                    icon={<IconBottomPanel />}
                                    active={isDrawerOpen}
                                    onClick={onToggleDrawer}
                                />
                            }
                        >
                            {isDrawerOpen ? 'Hide' : 'Show'} presenter notes
                        </Tooltip>
                    )}
                    {exportToPdf && (
                        <Tooltip
                            trigger={
                                <OSButton
                                    onClick={async () => {
                                        setIsExportingPdf(true)
                                        try {
                                            await exportPresentationToPdf({ slideId })
                                        } finally {
                                            setIsExportingPdf(false)
                                        }
                                    }}
                                    variant="ghost"
                                    disabled={isExportingPdf}
                                    icon={isExportingPdf ? <Loading /> : <IconPDF />}
                                />
                            }
                        >
                            Export to PDF
                        </Tooltip>
                    )}
                    {showFullScreen && (
                        <Tooltip
                            trigger={
                                <OSButton
                                    onClick={onFullScreenClick}
                                    variant="primary"
                                    size="sm"
                                    disabled={!onFullScreenClick}
                                    icon={<IconPlay />}
                                />
                            }
                        >
                            Open presentation mode
                        </Tooltip>
                    )}
                </div>
            </div>
        </>
    )
}
