import React, { useCallback, useState,useEffect } from "react";
import { useContext } from "react";
import { UserFunctionsContext } from "./contexts/context";
import filterpng from '../imgs/filtro.png'

function Categories(){

const{Search,Add,Publisher,HeaderTitle} = useContext(UserFunctionsContext)
const{setSearch,setAdd,setPublisher,setAPIlibraries,setHeaderTitle} = useContext(UserFunctionsContext)

const ClickFilter = useCallback<React.MouseEventHandler<HTMLInputElement>>((e)=>{
    
    if(!setSearch || !setAdd ||!setPublisher ||!setHeaderTitle)return
    if(e.currentTarget.checked && e.currentTarget.parentElement?.textContent === HeaderTitle){
        setHeaderTitle("")
        e.currentTarget.checked = false
     return
    }

    setPublisher("")
    setAdd(10)
    setSearch(e.currentTarget.value)
    setHeaderTitle(e.currentTarget.parentElement?.textContent)
 

},[Add,Search,Publisher,HeaderTitle])



const SearchPublishing = useCallback<React.MouseEventHandler<HTMLInputElement>>((e)=>{
    const value = e.currentTarget.value

    if(!setAPIlibraries || !setSearch || !setAdd || !setPublisher ||!setHeaderTitle)return
  
    (async ()=>{
        if(e.currentTarget.checked && e.currentTarget.parentElement?.textContent === HeaderTitle){
            setHeaderTitle("")
            e.currentTarget.checked = false
            return   
        }
            setSearch(" ")
            setAdd(10)
            setPublisher(value)
            setHeaderTitle(e.currentTarget.parentElement?.textContent)
       
       })()

},[Add,Search,Publisher,HeaderTitle])


const Categories = 
    [

        'linguistica',
        "children's literature",
        'literatura estrangeira',
        'religion and spirituality',
        'HQs e mangás',
        'human science and social sciences',
        'direito',
        'art',
        'autoajuda',
        'gastronomia',
        'biological sciences and medicine',
        'e-books',
        'administração,negócios',
        'economics and accounting',
        'ciências exatas,engenharia e tecnologia',
        'esportes,lazer e turismo',
        'cursos e idiomas',
        'gastronomia',
        'geografia and history',
        'psychology',
        'dicionário',
        'informática',
        'didático',
        'pets'

    ]


const TextContentCat =
    [

        'Linguística',
        'Literatura Infantojuvenil',
        'Literatura Estrangeira',
        'Religião e Espiritualidade',
        'HQ\'s e Mangás',
        'Ciências Humanas e Sociais',
        'Direito',
        'Artes',
        'Autoajuda',
        'Gastronomia',
        'Ciências Biológicas e Medicina',
        'E-books',
        'Administração e Negócios',
        'Economia e Contabilidade',
        'Ciências Exatas, Engenharia e Tecnologia',
        'Esportes, Lazer e Turismo',
        'Cursos e Idiomas',
        'Gastronomia',
        'Geografia e História',
        'Psicologia',
        'Dicionários',
        'Informática',
        'Didático',
        'Pets'

    ]


const names =
    [
        'Novatec',
        'Editora Schwarcz SA',
        'Panini Brasil LTDA',
        'CIRANDA CULTURAL EDITORA E DISTRIBUIDORA LTDA.',
        'Editora Record Ltda.',
        'Editora Vozes Ltda.',
        'Editora CRV LTDA ME',
        'Saraiva Educação S. A.',
        'Editora Planeta do Brasil Ltda.',
        'Editora Melhoramentos Ltda.',
        'Editora Rocco Ltda',
        'Grupo Editorial Global',
        'Editora Nova Fronteira Participações S/A',
        'Serviço Nacional de Aprendizagem Comercial',
        'Editora Intrínseca Ltda.',
        'Editora Best Seller Ltda',
        'WMF MARTINS FONTES',
        'GMT Editores Ltda.',
        'Cengage Learning Edições Ltda.',
        'Astral Cultural Editora Ltda',
        'Universo dos Livros Editora LTDA',
        'Starlin Alta Editora E Consultoria Eireli',
        'IBC - Instituto Brasileiro de Cultura Ltda',
        'Editora Atlas Ltda.',
        'Pearson Education do Brasil S.A.',
        'Editora Perspectiva Ltda.',       
        'VR Editora SA',
        'Instituto Beneficente Boa Nova',
        'Editora do Brasil',
        'Novo Século Editora e Distribuidora Ltda.',
        'Wiser Educação S.A',
        'Editora Bertrand Brasil Ltda.',
        'Autêntica Editora LTDA',
        'Cortez Editora e Livraria LTDA',
        'Editora Globo S/A',
        'Casa dos Livros Editora Ltda', 
        'Fundação de Apoio Inst. Ao Desenv. Cient. E Tecnologico',  
        'Editora Arqueiro Ltda.',   
        'Geração Editorial Ltda',
        'Editora Gente Livraria e Editora Ltda.', 
        'EDITORA LAFONTE LTDA',
        'Editora DCL - Difusão Cultural do Livro Eireli',
        'Summus Editorial Ltda.',
        'Companhia Editora Nacional',
        'Casa dos Mundos Produção Editorial e Games LTDA',
        'Editora Martin Claret Ltda',   
        'Editora José Olympio Ltda.',
        'Editora Campos Ltda',  
        'Literare Books International Ltda',   
        'JAFAR SISTEMAS DE ENSINO E CURSOS LIVRES',
        'Editora Manole LTDA',
        'Verus Editora Ltda.', 
        'Fundação Editora da Unesp',
        'Pandorga Editora e Produtora LTDA', 
        ' NewPOP Editora LTDA ME',  
        'Malheiros Editores LTDA',
        'Editora Pensamento Cultrix Grupo Pensamento',   
        'Editora Original Ltda.',
        'Editora Hagnos Ltda', 
        'Appris Editora e Livraria Eireli - ME',
        'LTC - Livros Técnicos e Científicos Editora Ltda.',
        'Editora 34 Ltda.',
        'CDG Edições e Publicações Eireli',  
        'Editora Pinsky Ltda', 
        'Editora Pensamento-Cultrix Ltda.',  
        'Editora de livros Cobogó LTDA',  
        'Editora Moinhos Ltda',  
        'Vida Melhor Editora S.A',   
        'BOOKMAN COMPANHIA EDITORA LTDA.',     
        'ARTMED EDITORA LTDA.',    
        'Ateliê Editorial Ltda - EPP',   
        'Pólen Produção Editorial Ltda.',      
        'Girassol Brasil Edições EIRELI',   
        'Editora Urbana Ltda',      
        'Autêntica Editora Ltda.',     
        'Jinkings editores associados LTDA-EPP',     
        'Editora Aleph Ltda',     
        'EO Editora LTDA',      
        'Editora Intersaberes Ltda.',     
        'Conrad Editora do Brasil Ltda.',      
        'Pia Sociedade Filhas de São Paulo',      
        'Ação Social Claretiana',     
        'Matéria Escura Editora Ltda',       
        'Luz da Serra Editora Ltda.',    
        'Editora Labrador Ltda',     
        'Brinque-Book Editora de Livros Ltda',
        'EDITORA BIRUTA LTDA.',
        'Rodrigo Pereira Lopes de Faria e Silva 13645530827',
        'Editora Meridional Ltda',
        'Brasil Franchising Participações Ltda',
        'ASSOCIAÇÃO RELIGIOSA EDITORA MUNDO CRISTÃO',
        'Catapulta Editores Ltda',
        'Happy Books',
        'DVS EDITORA LTDA',
        'Editora Forense Ltda.',
        'nVersos.',
        'Ministério Pão Diário',
        'Edições Sesc São Paulo',
        'Editora Todavia',
        'Editora Guanabara Koogan Ltda.',
        'Callis Editora Ltda.',
        'Gen',
        'Editora Pensamento-Cultrix Ltda. Grupo Editorial Pensamento',
        'BRO Global',
        'AMGH EDITORA LTDA. AMGH Editora',
        'PENSO EDITORA LTDA.',
        'Editora Peirópolis Ltda',
        'Editora Belas-Letras Ltda.',
        'Duran',
        'Editora Europa Ltda.',
        'Editora CL-A Cultural Ltda',
        'Associação Nóbrega de Educação',
        'Editora Gaivota Ltda.',
        'Editora Atheneu Ltda',
        'DBA Dorea Books',
        'Dash Editora e Importadora LTDA',
        'Culturama',
        'Unipro Editora Ltda',
        'Editora Valentina Ltda',
        'Editora Vale das Letras LTDA',
        'Editora Foco Jurídico Ltda',
        'Editora Évora Eireli',
        'Serena Ltda',
        'Malê',
        'HR',
        'Editora Dublinense Ltda.',
        'Ubu Editora Ltda ME',
        'Thieme Revinter Publicações Ltda',
        'Terra Virgem',
        'Editora Ideal Books Ltda',
        'Bazar do Tempo Produções e Empreendimentos Culturais Ltda.',
        'Editora Terceiro Nome',
        'Book One Editora',
        'Avec Editora e Comércio de Livros Ltda.',
        'Ajna',
        'Sarvier Editora de Livros Médicos Ltda',
        'Quadrante Editora',
        'Pinto & Zincone Editora Ltda.',
        'Pingo de Ouro Editores Ltda',
        'Paisagem Distribuidora de Livros Ltda.',
        'Geo-Gráfica e Editora Ltda',
        'Fundação Oswaldo Cruz',
        'Freitas Bastos',
        'Editora Nova Alexandria Ltda',
        'Editora Intrínseca Ltda',
        'Editora 106 Ltda.',
        'Sociedade Bíblica do Brasil',
        'Papaki Editora Eireli',
        'M. R. Cornacchia Editora Ltda.',
        'Editora Dufaux Ltda EPP',
        'Dreamsellers Pictures Ltda',
        'Categoria Produtos e Serviços LTDA',
        'Casa Publicadora das Assembleias de Deus',
        'Pioneira Editorial',
        'Marina Avila',
        'Lamparina Editora Ltda',
        'Insígnia Editorial Ltda',
        'Editora Kapulana Ltda. ME',
        'Editora Estação Liberdade',
        'Edipro - edições profissionais ltda',
        'Casa dos Espíritos Editora Ltda',
        'Arquipélago',
        'Sonora',
        'Onze Cultural',
        'LETRAMENTO',
        'Fundação de Apoio a Universidade Federal de São Paulo',
        'Editora Garamond Ltda',
        'Editora dos Editores Eireli',
        'Claridade',
        'LOYOLA',
        'Topbooks Editora e Distribuidora de Livros Ltda',
        'Saber e Ler Editora Ltda',
        'Qualis'
    
   ]



return(
    <div className="categories-container">
        <div className="categories-container-title">
        <div className="filter-title"><img src={filterpng}></img><h2>Filtros</h2></div>
        </div>
        <h3>Categoria</h3>
        <ul>

        {Categories.map((items, index:any) => {
        const item = TextContentCat[index]
  
            return (
                <li key={index}>
                <input id={index +1} defaultValue={items} name={"categories"} onClick={ClickFilter} type="radio" />
                {item}
                </li>
            )
            })}

        </ul>

        <div className="Editora-container">
        <h3>Editora</h3>
        <ul>


        {names.map((items:string,index:any)=>{
    
        return (
        <li key={index}>
           
            <input id={index +1} name={"categories"} className="publisher-input"  defaultValue={items} onClick={SearchPublishing} type="radio"></input>{items}
            
        </li>
        )
           
        })}


        </ul>

        </div>
    </div>
)


}export default Categories