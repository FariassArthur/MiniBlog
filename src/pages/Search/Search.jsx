
//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
	const query = useQuery()
	const search = query.get("q")
	//o método get é do urlsearchparams e permite buscar um dado atrelado

	return <div>
		<h2>Search</h2>
		<p>{search}</p>
	</div>
}

export default Search;