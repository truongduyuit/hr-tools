import { Box, BoxProps } from "@chakra-ui/react"
import Link from "next/link"

export const CustomLink: React.FC<{ href: string, label: string, props?: BoxProps }> = ({href, label, props}) => {
    return <Link href={href} passHref>
        <Box textDecoration="underline" color="blue" cursor="pointer" {...props}>{label}</Box>
    </Link>
}