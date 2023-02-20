interface Props {
    percentage?: boolean
}

export const LoadingCard = ({ percentage }: Props) => {
    return (
        <>
            <div className="flex h-full flex-col justify-around p-2">
                <div className="aspect-square animate-pulse rounded-full bg-dark-3 shadow-black shadow-md" />
                <div>
                    <div className="mx-auto mt-3 mb-1 hidden h-6 w-[50%] animate-pulse bg-dark-3 md:block" />
                    {percentage ? (
                        <div className="mx-auto h-5 w-[50%] animate-pulse bg-dark-3" />
                    ) : (
                        <div className="mx-auto h-8 w-[50%] animate-pulse bg-dark-3" />
                    )}
                </div>
            </div>
        </>
    )
}
