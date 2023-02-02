import { formatPercentage } from "utils/formatPercentage"
import formatString from "utils/formatString"

interface Props {
    data: {name: string, amount: number}[]
    total: number
}
export const CommonDataCard = ({ data, total }: Props) => {


    return (
        <div className="grid gap-1">
            {data.slice(0, 6).map((data) => {
                const percentage = formatPercentage(
                    data.amount / total
                )
                return (
                    <div className="flex justify-between rounded bg-dark-3 px-4 py-2">
                        <h4>{formatString(data.name)}</h4>
                        <h5>{percentage}</h5>
                    </div>
                )
            })}
        </div>
    )
}
