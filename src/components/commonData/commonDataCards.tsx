import { formatPercentage } from "utils/formatPercentage"
import formatString from "utils/formatString"

interface Props {
    data: {name: string, amount: number}[]
    total: number
}
export const CommonDataCard = ({ data, total }: Props) => {


    return (
        <>
            {data.slice(0, 6).map((data) => {
                const percentage = formatPercentage(
                    data.amount / total
                )
                return (
                    <div className="flex justify-between rounded dark:bg-dark-2 px-4 py-2" key={data.name}>
                        <h4>{formatString(data.name)}</h4>
                        <h5>{percentage}</h5>
                    </div>
                )
            })}
        </>
    )
}
