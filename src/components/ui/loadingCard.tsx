export const LoadingCard = ({}) => {
    return (
        <>
            <div className=" h-full p-3 grid gap-1">
                <div className="aspect-square animate-pulse rounded-full bg-dark-3" />
                <div className="grid gap-1">
                    <div className="mx-auto h-6 w-[50%] animate-pulse bg-dark-3" />
                    <div className="mx-auto h-6 w-[50%] animate-pulse bg-dark-3" />
                </div>
            </div>
        </>
    )
}
