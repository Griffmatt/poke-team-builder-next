const LoadingSpinner = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-dark/5"></div>
        </div>
    )
}

export default LoadingSpinner
