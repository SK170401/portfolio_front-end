import React from 'react'
import { Interface } from '@/app/Constants/interface'
import { client } from '@/app/Client/client'
import { urlFor } from '@/app/Constants/imageBuilder';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

async function getData() {
    const data = await client.fetch(`*[_type == 'projects']`);
    return data as Interface;
}


const slug = async ({ params }) => {
    const data = (await getData()) as unknown as Interface[];

    return (
        <div className='min-h-[65vh] py-40 lg:max-w-[1560px] mx-auto px-5'>
            <div>{data.map((item, idx) => {
                if (item._id == params.slug) {
                    return <div key={idx}>
                        <div className='flex max-[880px]:flex-col justify-between items-center gap-10'>
                            <div className='lg:w-1/2 h-full flex justify-center'>
                                <Image className='rounded-xl pointer-events-none' src={urlFor(item.image).url()} alt={item.caption} width={500} height={500} draggable={false}></Image>
                            </div>
                            <div className='flex flex-col min-[880px]:w-1/2 max-sm:px-0 max-[880px]:px-14 self-start'>
                                <h1 className='text-[3em] font-bold text-transparent bg-clip-text w-fit bg-gradient-to-r from-[#B16CEA] via-[#FF5E69] to-[#FFA84B]'>{item.name}</h1>
                                <div className='w-fit'>
                                    <Badge variant={'outline'}>
                                        {item.tag}
                                    </Badge>
                                </div>
                                <div className='pt-5'>
                                    <PortableText value={item.description}></PortableText>
                                </div>
                                <div className='pt-10 w-fit flex self-end'>
                                    <Link href={`${item?.link || ''}`} target={`${item.link? '_blank' : ''}`}>
                                        <Button>{'View live version'}</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            })}</div>

        </div>
    )
}

export default slug