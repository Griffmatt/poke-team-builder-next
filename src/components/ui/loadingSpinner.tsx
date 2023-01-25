const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin border-t-dark/5"></div>
      </div>
    )
  }

  export default LoadingSpinner