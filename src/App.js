import './App.css';
import { useState } from 'react';

//4 - Custom hook //
import { useFetch } from './hooks/useFetch';

const url = 'http://localhost:3001/products';

function App() {


  //4 - Custom hook //
  const {data: items, httpConfig, loading, error} = useFetch(url);

  const [name , setName] = useState("");
  const [price , setPrice] = useState("");

  //1 - resgatando dados//
  /*useEffect(() => {
    async function fetchData(){
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  }
  fetchData();
}, []); */

// 2 - Add de produtos //
const handleSubmit = async (e) => {
e.preventDefault() // previnindo de nao submeter o form do jeito tradicional//

const product = {
  name,
  price,
};



// Fazendo a requisição //

/* const res = await fetch(url, {
  method:"POST",  //configura como sera a requisição//
  headers: {  //cabeçalhos da requisição, que tipo de conteudo estamos manipulando //
    "Content-Type" : "application/json", //estamos manipulando um json//
  },
  body: JSON.stringify(product), //corpo da requisição é json, o stringfy passa o objeto do js para json//
} );

// 3 - Carregamento  dinâmico //

const addedProduct = await res.json(); //transforma o json em um objeto js //
setProducts((prevProducts) => [...prevProducts, addedProduct] ); */

// 5 - Refatorando POST //

httpConfig(product, "POST")

setName("");
setPrice("");

};
const handleRemove = (id) => {
  httpConfig(id, "DELETE");
};
return (
    <div className="App">
    <h1>Lista de produtos</h1>
    {/* 6 - Loading */}
    {loading && <p>Carrregando dados...</p>}
    {!loading && (
    <ul>
      {items && items.map((product) => (
      <li key={product.id}>{product.name} - R$: {product.price}
       {/* Desafio 6 */}
       <button onClick={() => handleRemove(product.id)}>Excluir</button>
       </li>
      ))}
    </ul>
    )}
  <div className='add-prdouct' >
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)}></input>
      </label>
      <label>
        Preço:
        <input type='text' value={price} name='price' onChange={(e) => setPrice(e.target.value)}></input>
       
      </label>
      
      {/* 7 -  state de loading no post (tirar o botao quando o loading estiver ativo, para nao adicionar o mesmo produto num clique duplo) */}
      {loading && <input type='submit' disabled value="Aguarde"/>} {/* Assim desabilita o botao */}
      {error && <p>{error}</p>}
      {!loading && <input type='submit' value="Criar" />} {/*Assim some o botão */}
    </form>
  </div>
    </div>
  );
}

export default App;
