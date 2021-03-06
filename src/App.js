import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
//import backgroundImage from './assets/background.jpeg';

import Header from './components/Header';

function App() {

    const [ projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    }, []);
 

    async function handleAddProject() {
        //projects.push(`Novo Projeto ${Date.now()}`)
       // setProjects([...projects,`Novo Projeto ${Date.now()}`])
       const response = await api.post('projects', {
            "title": `Novo Projeto ${Date.now()}`,
            "owner": "Thiago Meneses"
        })
       
        const project = response.data;

        setProjects([...projects, project])

    }

    return (
        //fragment: <> </> cria um container para envolver dois ou mais componentes e nao mostrar na arvore de elementos
        <>
            <Header title="HomePage"/>
            
           <ul>
    {           projects.map(project => <li key={project.id}>{project.title}</li>)}
           </ul>
           <button type="button" onClick={handleAddProject}>Add projects</button>
        </>
        
    );
}

export default App;