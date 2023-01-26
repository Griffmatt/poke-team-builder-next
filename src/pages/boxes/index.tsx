import { type NextPage } from "next"
import { BoxesNav } from "../../components/boxes/boxesNav"

const Boxes: NextPage = () => {
    return (
        <main>
            <h2>Boxes</h2>
            <BoxesNav selected="popular" />
            <div className="grid gap-3">
                <h3>Popular Teams</h3>
            </div>
            <div className="grid gap-3">
                <h3>Popular Pokemon</h3>
            </div>
        </main>
    )
}

export default Boxes
