import { useRouter } from "next/router"

export const BackButton = () => {
    const router = useRouter()
    return (
        <button
            className="w-fit rounded-2xl px-4 py-2"
            onClick={() => router.back()}
        >
            Back
        </button>
    )
}
