import React, { useState, useEffect } from 'react'
import WindowTabs from 'components/WindowTabs'
import { Fieldset } from 'components/OSFieldset'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Popover } from 'components/RadixUI/Popover'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconDay, IconInfo, IconLaptop, IconNight } from '@posthog/icons'
import { SEO } from 'components/seo'
import { useApp } from '../context/App'
import type { SiteSettings } from '../context/App'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import Tooltip from 'components/RadixUI/Tooltip'

const XL_CURSOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 28"><g clip-path="url(#a)"><path fill="#000" stroke="#fff" stroke-width="5" d="m44.77 50.196.024.01.025.008c.48.177 1.014.286 1.58.286.665 0 1.28-.147 1.837-.392l.012-.006.013-.006 8.8-3.997.002-.001a4.5 4.5 0 0 0 2.225-5.968v-.001l-10.73-23.395 16.828-1.446.008-.001a4.504 4.504 0 0 0 2.678-7.78L20.073-37.289a4.51 4.51 0 0 0-4.858-.843l-.011.005A4.499 4.499 0 0 0 12.5-34v66a4.503 4.503 0 0 0 2.715 4.133l.01.003a4.505 4.505 0 0 0 4.86-.859L32.01 24.072l10.259 23.717.005.012.005.011a4.527 4.527 0 0 0 2.492 2.384Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h74v28H0z"/></clipPath></defs></svg>`

const colorModeOptions: ToggleOption[] = [
    {
        label: 'System',
        value: 'system',
        icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Light',
        value: 'light',
        icon: <IconDay className="size-5" />,
        default: true,
    },
    {
        label: 'Dark',
        value: 'dark',
        icon: <IconNight className="size-5" />,
    },
]

const skinOptions: ToggleOption[] = [
    {
        label: 'Modern',
        value: 'modern',
        // icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Classic',
        value: 'classic',
        // icon: <IconLaptop className="size-5" />,
    },
]

const cursorOptions: ToggleOption[] = [
    {
        label: 'Default',
        value: 'default',
    },
    {
        label: 'XL',
        value: 'xl',
        icon: <div dangerouslySetInnerHTML={{ __html: XL_CURSOR_SVG }} className="h-5 w-full relative -top-1" />,
    },
    {
        label: "James' face",
        value: 'james',
        icon: (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_default_d6f7983b0a.png"
                alt="James' Face"
                className="h-6 -my-1"
            />
        ),
    },
]

interface WallpaperOption {
    label: string
    value: string
    thumb: {
        light: string
        dark: string
    }
}

const wallpaperOptions: WallpaperOption[] = [
    {
        label: 'Hogzilla',
        value: 'hogzilla',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_light_1b27bcadcf.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_dark_7f240e0422.png',
        },
    },
    {
        label: 'Startup Monopoly',
        value: 'startup-monopoly',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_startup_monopoly_light_b38ca0c4e5.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_startup_monopoly_dark_699c375497.png',
        },
    },
    {
        label: 'Office party',
        value: 'office-party',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_office_party_light_192b0c000f.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_office_party_dark_1d95807317.png',
        },
    },
    {
        label: 'Keyboard garden',
        value: 'keyboard-garden',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_keyboard_garden_light_272a92dc4c.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_keyboard_garden_dark_d8b80b34db.png',
        },
    },
    {
        label: '2001 bliss',
        value: '2001-bliss',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_light_0b2e4ef53c.jpg',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_dark_703ec033d6.jpg',
        },
    },
    {
        label: 'Parade',
        value: 'parade',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_parade_light_7e7662c9dd.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_parade_dark_cc5b24c520.png',
        },
    },
    {
        label: 'Coding at night',
        value: 'coding-at-night',
        thumb: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_coding_at_night_2df33d2f3d.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_coding_at_night_2df33d2f3d.png',
        },
    },
]

const experienceOptions = [
    {
        label: (
            <span>
                Multi-window{' '}
                <Tooltip trigger={<IconInfo className="size-4 inline-block relative -top-px" />} delay={0}>
                    <p className="max-w-sm my-0">Like a desktop OS, open as many windows as you like.</p>
                </Tooltip>
            </span>
        ),
        value: 'posthog',
    },
    {
        label: (
            <span>
                Squirrel mode{' '}
                <Tooltip trigger={<IconInfo className="size-4 inline-block relative -top-px" />} delay={0}>
                    <p className="max-w-sm my-0">Too many windows? Limit yourself to one window at a time.</p>
                </Tooltip>
            </span>
        ),
        value: 'boring',
    },
] satisfies (ToggleOption & { value: SiteSettings['experience'] })[]

// Custom WallpaperSelect component
interface WallpaperSelectProps {
    value: string
    onValueChange: (value: string) => void
    title: string
}

const WallpaperSelect = ({ value, onValueChange, title }: WallpaperSelectProps) => {
    const [isDark, setIsDark] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // Check theme from body class
    useEffect(() => {
        const checkTheme = () => {
            const bodyClass = document.body.className
            setIsDark(bodyClass.includes('dark'))
        }

        checkTheme()

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

        return () => observer.disconnect()
    }, [])

    const currentOption = wallpaperOptions.find((option) => option.value === value)
    const currentThumb = currentOption ? (isDark ? currentOption.thumb.dark : currentOption.thumb.light) : null

    const handleSelect = (selectedValue: string) => {
        onValueChange(selectedValue)
        // setIsOpen(false) // Close the popover after selection
    }

    const trigger = (
        <button
            type="button"
            className="w-full bg-white dark:bg-dark border border-primary rounded px-2 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between hover:bg-accent"
        >
            <div className="flex items-center gap-3">
                {currentThumb && (
                    <img
                        src={currentThumb}
                        alt={currentOption?.label || ''}
                        className="w-[150px] h-[94px] object-contain border border-primary rounded"
                    />
                )}
                <span className="text-primary">{currentOption?.label || 'Select wallpaper'}</span>
            </div>
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    )

    return (
        <>
            <label className="pt-1.5 text-sm">{title}</label>
            <Popover
                trigger={trigger}
                dataScheme="secondary"
                contentClassName="@container bg-primary w-[800px] max-w-full min-h-[200px] h-[400px] max-h-full"
                sideOffset={8}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <div className="grid @xl:grid-cols-2 @2xl:grid-cols-3 @xl:gap-2 p-2">
                    {wallpaperOptions.map((option) => {
                        const optionThumb = isDark ? option.thumb.dark : option.thumb.light
                        const isSelected = option.value === value
                        return (
                            <button
                                key={option.value}
                                type="button"
                                data-scheme="primary"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full p-2 text-left bg-primary hover:bg-accent border border-input hover:border-primary flex flex-col items-center gap-3 rounded ${
                                    isSelected ? 'bg-accent' : ''
                                }`}
                            >
                                <img
                                    src={optionThumb}
                                    alt={option.label}
                                    className="w-full h-auto object-cover rounded"
                                />
                                <span className={`text-primary ${isSelected ? 'font-bold' : 'font-medium'}`}>
                                    {option.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </Popover>
        </>
    )
}

export default function DisplayOptions() {
    const { siteSettings, updateSiteSettings } = useApp()

    const handleExperienceChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, experience: value as SiteSettings['experience'] })
    }

    const handleColorModeChange = (value: string) => {
        if (typeof window !== 'undefined' && (window as any).__setPreferredTheme) {
            ;(window as any).__setPreferredTheme(value)
        }
        updateSiteSettings({ ...siteSettings, colorMode: value as SiteSettings['colorMode'] })
    }

    const handleSkinChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, skinMode: value as SiteSettings['skinMode'] })
    }

    const handleCursorChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, cursor: value as SiteSettings['cursor'] })
    }

    const handleWallpaperChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, wallpaper: value as SiteSettings['wallpaper'] })
    }

    return (
        <>
            <SEO title="Site settings" description="Personalize your PostHog.com experience" />
            <div data-scheme="secondary" className="w-full h-full bg-primary text-primary p-2">
                <Fieldset legend="Display">
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Color mode"
                            options={colorModeOptions}
                            onValueChange={handleColorModeChange}
                            value={siteSettings.colorMode}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Theme"
                            options={skinOptions}
                            onValueChange={handleSkinChange}
                            value={siteSettings.skinMode}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2 mt-2">
                        <ToggleGroup
                            title="Cursor"
                            options={cursorOptions}
                            onValueChange={handleCursorChange}
                            value={siteSettings.cursor}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2 mt-2">
                        <WallpaperSelect
                            title="Desktop background"
                            onValueChange={handleWallpaperChange}
                            value={siteSettings.wallpaper}
                        />
                    </div>
                </Fieldset>
                <Fieldset legend="Navigation">
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Experience"
                            options={experienceOptions}
                            onValueChange={handleExperienceChange}
                            value={siteSettings.experience}
                        />
                    </div>
                </Fieldset>
            </div>
        </>
    )
}
