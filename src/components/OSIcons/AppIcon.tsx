import React from 'react'
import { BaseIcon, type IconProps } from './Icons'
import { Link } from 'gatsby'
import { useRef } from 'react'

// App icon mapping for different skins
type AppIconVariants = {
    classic?: string
    modern?: string
    default: string
}

type AppIconName =
    | 'doc'
    | 'pricing'
    | 'notebook'
    | 'tour'
    | 'map'
    | 'spreadsheet'
    | 'forums'
    | 'games'
    | 'photobooth'
    | 'contact'
    | 'posthog'
    | 'folder'
    | 'presentation'

const PRODUCT_ICON_MAP: Record<AppIconName, AppIconVariants> = {
    doc: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/doc_classic_7f14381c43.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/doc_2fa451a8e4.png',
    },
    folder: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_classic_d2fdf96f82.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_af7d0524aa.png',
    },
    presentation: {
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/presentation_f329e94fe5.png',
    },
    pricing: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/pricing_b461c2e5dd.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/pricing_04a97aa301.png',
    },
    notebook: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/document_bb8267664e.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/document_001e7ec29a.png',
    },
    tour: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/tour_8ae29710fc.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/tour_2994e40ea9.png',
    },
    map: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/roadmap_3691544cec.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/roadmap_ac25f48fe0.png',
    },
    spreadsheet: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/spreadsheet_classic_8ea2ebdb10.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/spreadsheet_2d556ac08a.png',
    },
    forums: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/forums_a48a37683e.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/forums_b1926ec5fa.png',
    },
    games: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/games_6931a0e3a5.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/games_96649d6774.png',
    },
    photobooth: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/photobooth_db172dc28e.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/photobooth_f46836ce68.png',
    },
    contact: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/contact_4af3eed18f.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/contact_5331716a3a.png',
    },
    posthog: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_95648ff771.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_bdd451f4e8.png',
    },
}

export interface AppIconProps extends IconProps {
    name: AppIconName
    className?: string
}

export interface IconImageProps extends IconProps {
    url: string
    className?: string
}

export const IconImage = ({ url, className, ...props }: IconImageProps) => (
    <BaseIcon viewBox="0 0 40 40" width="100%" height="100%" className={`size-10 ${className ? className : ''}`}>
        <image width="40" height="40" href={url} />
    </BaseIcon>
)

export const AppIcon = ({ name, className, ...props }: AppIconProps) => {
    const getCurrentSkin = (): string => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('skin') || 'modern'
        }
        return 'modern'
    }

    const getIconUrl = (iconName: AppIconName): string => {
        const iconVariants = PRODUCT_ICON_MAP[iconName]
        if (!iconVariants) {
            console.warn(`AppIcon: Unknown icon name "${iconName}"`)
            return ''
        }

        const currentSkin = getCurrentSkin()

        // Check if the current skin has a specific variant
        if (currentSkin in iconVariants) {
            return iconVariants[currentSkin as keyof AppIconVariants] || iconVariants.default
        }

        // Fall back to default
        return iconVariants.default
    }

    const iconUrl = getIconUrl(name)

    return <IconImage url={iconUrl} className={className} {...props} />
}

export type { AppIconName }

export interface AppItem {
    Icon: React.ElementType | React.ReactElement | string
    type?: string
    color?: string
    background?: string
    label: string
    url: string
    className?: string
    extension?: string
    children?: React.ReactNode
}

export const AppLink = ({ Icon, type, color, background, label, url, className, extension, children }: AppItem) => {
    const ref = useRef<HTMLSpanElement>(null)

    const renderIcon = () => {
        if (typeof Icon === 'string') {
            return <IconImage url={Icon} className={`text-${color} ${className}`} />
        }

        if (React.isValidElement(Icon)) {
            return React.cloneElement(Icon as React.ReactElement<any>, {
                className: `text-${color} ${className}`,
            })
        }

        // Icon is a ComponentType
        const IconComponent = Icon as React.ComponentType<any>
        return <IconComponent className={`text-${color} ${className}`} />
    }

    return (
        <figure ref={ref}>
            <Link
                to={url}
                state={{ newWindow: true }}
                className="group inline-flex flex-col justify-center items-center w-auto max-w-28 text-center select-none space-y-1 text-primary"
            >
                <span className="relative">
                    {renderIcon()}
                    {children}
                </span>
                <figcaption className="text-sm font-medium leading-tight">
                    <span
                        className={`inline-block ${
                            background
                                ? background
                                : 'bg-[rgba(238,239,233,0.75)] group-hover:bg-[rgba(238,239,233,1)] dark:bg-[rgba(1,1,1,0.75)] dark:group-hover:bg-[rgba(1,1,1,1)]'
                        }  rounded-[2px] px-0.5 py-0 leading-tight`}
                    >
                        <span className="skin-classic:underline decoration-dotted decoration-primary underline-offset-[3px]">
                            {label}
                            {extension && <span className="opacity-75">.{extension}</span>}
                        </span>
                    </span>
                </figcaption>
            </Link>
        </figure>
    )
}
