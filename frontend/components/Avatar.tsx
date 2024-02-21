import Image from "next/image";
import {ReactEventHandler, useState} from "react";

export default function Avatar({avatarURL, size, className}: {avatarURL: string, size: number, className: string}) {
    const [src, setSrc] = useState(avatarURL)

    return (
        <Image
            className={className}
            src={src}
            alt='avatar'
            width={size}
            height={size}
            loading="lazy"
            onError={() => setSrc('/avatar.png')}
        />
    );
};

