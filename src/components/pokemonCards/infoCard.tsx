import { type Pokemon } from "types/trpc"
import { PokemonImage } from "./pokemonImage"
import Image from "next/image"

import "assets/images/darkType.png"

interface Props {
    pokemon: Pokemon
}

export const InfoCard = ({ pokemon }: Props) => {
    return (
        <section className="h-full rounded text-center">
            <div className="flex items-center justify-center p-2">
                <div className="aspect-square w-[50%]">
                    <PokemonImage pokemonName={pokemon.name} />
                </div>
            </div>
            <div className="col-span-full grid h-fit grid-cols-2 place-items-center gap-2">
                <div>
                    <h3>Strengths</h3>
                    <div className="flex gap-1">
                        {pokemon.typeDamage.strongAgainst.map((type) => {
                            return (
                                <div key={type}>
                                    <Image
                                        src={
                                            // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
                                            require(`assets/images/${type}Type.png`)
                                        }
                                        alt={`${type} type symbol`}
                                        height="20"
                                        width="20"
                                        className="lg:h-7 lg:w-7"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h3>Weaknesses</h3>
                    <div className="flex gap-1">
                        {pokemon.typeDamage.weakAgainst.map((type) => {
                            return (
                                <div key={type}>
                                    <Image
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                        src={require(`assets/images/${type}Type.png`)}
                                        alt={`${type} type symbol`}
                                        height="20"
                                        width="20"
                                        className="lg:h-7 lg:w-7"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
