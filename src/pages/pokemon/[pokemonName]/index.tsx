import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { api } from '../../../utils/api'



const SinglePokemon: NextPage = () => {
  const router = useRouter()
  const { pokemonName } = router.query

  const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({name: pokemonName})
  
    return <main>
      <h2>{pokemon.name}</h2>
    </main>
}

export default SinglePokemon
