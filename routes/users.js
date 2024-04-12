const express = require("express");
const router = express.Router(); //sistema de router

const users = [
    { firstName: 'SAMUEL', lastName: 'ACERO GARCIA', email: 'samuelacga@unisabana.edu.co' },
    { firstName: 'DAREK', lastName: 'ALJURI MARTINEZ', email: 'darekalma@unisabana.edu.co' },
    { firstName: 'ANDRÉS FELIPE', lastName: 'AZCONA GOMEZ', email: 'andresasgo@unisabana.edu.co' },
    { firstName: 'JUAN FELIPE', lastName: 'CEPEDA URIBE', email: 'juanceur@unisabana.edu.co' },
    { firstName: 'ANA MARIA', lastName: 'CHAVEZ PEREZ', email: 'anachpe@unisabana.edu.co' },
    { firstName: 'CARLOS DAVID', lastName: 'CRUZ PAVAS', email: 'carloscrpa@unisabana.edu.co' },
    { firstName: 'DIEGO NORBERTO', lastName: 'DIAZ ALGARIN', email: 'diegodial@unisabana.edu.co' },
    { firstName: 'JORGE ESTEBAN', lastName: 'Diaz Beltran', email: 'jorgedibe@unisabana.edu.co' },
    { firstName: 'DAVID ESTEBAN', lastName: 'DIAZ VARGAS', email: 'daviddiava@unisabana.edu.co' },
    { firstName: 'JUAN JOSE', lastName: 'FORERO PEÑA', email: 'juanfope@unisabana.edu.co' },
    { firstName: 'SANTIAGO', lastName: 'GUTIERREZ DE PIÑERES BARBOSA', email: 'santiagoguba@unisabana.edu.co' },
    { firstName: 'SAMUEL ESTEBAN', lastName: 'LOPEZ HUERTAS', email: 'samuellohu@unisabana.edu.co' },
    { firstName: 'MICHAEL STEVEN', lastName: 'MEDINA FERNANDEZ', email: 'michaelmefe@unisabana.edu.co' },
    { firstName: 'KATHERIN JULIANA', lastName: 'MORENO CARVAJAL', email: 'katherinmoca@unisabana.edu.co' },
    { firstName: 'JUAN PABLO', lastName: 'MORENO PATARROYO', email: 'juanmopa@unisabana.edu.co' },
    { firstName: 'NICOLAS ESTEBAN', lastName: 'MUÑOZ SENDOYA', email: 'nicolasmuse@unisabana.edu.co' },
    { firstName: 'SANTIAGO', lastName: 'NAVARRO CUY', email: 'santiagonacu@unisabana.edu.co' },
    { firstName: 'JUAN PABLO', lastName: 'PARRADO MORALES', email: 'juanpamo@unisabana.edu.co' },
    { firstName: 'DANIEL SANTIAGO', lastName: 'RAMIREZ CHINCHILLA', email: 'danielrachi@unisabana.edu.co' },
    { firstName: 'JUAN PABLO', lastName: 'RESTREPO COCA', email: 'juanreco@unisabana.edu.co' },
    { firstName: 'GABRIELA', lastName: 'REYES GONZALEZ', email: 'gabrielarego@unisabana.edu.co' },
    { firstName: 'JUAN JOSE', lastName: 'RODRIGUEZ FALLA', email: 'juanrodfa@unisabana.edu.co' },
    { firstName: 'VALENTINA', lastName: 'RUIZ TORRES', email: 'valentinvaruto@unisabana.edu.co' },
    { firstName: 'MARIANA', lastName: 'SALAS GUTIERREZ', email: 'marianasagu@unisabana.edu.co' },
    { firstName: 'SEBASTIAN', lastName: 'SANCHEZ SANDOVAL', email: 'sebastiansasa@unisabana.edu.co' },
    { firstName: 'JOSUE DAVID', lastName: 'SARMIENTO GUARNIZO', email: 'josuesagua@unisabana.edu.co' },
    { firstName: 'SANTIAGO', lastName: 'SOLER PRADO', email: 'santiagosopra@unisabana.edu.co' },
    { firstName: 'MARIA FERNANDA', lastName: 'TAMAYO LOPEZ', email: 'mariatalo@unisabana.edu.co' },
    { firstName: 'DEIVID NICOLAS', lastName: 'URREA LARA', email: 'deividurla@unisabana.edu.co' }
];

router.get('/:count', (req, res) => {
    const count = parseInt(req.params.count, 10) || 10; //asegura que count sea un número entero o, de lo contrario, se establece en 10 por defecto.
    let sortOrder = (req.query.sort || 'ASC').toUpperCase(); //asegura que sortOrder sea 'ASC' o 'DESC'

    if (!['ASC', 'DESC'].includes(sortOrder)) {
        return res.status(400).send('Parámetro de organización inválido. Utilice "ASC" o "DESC".');
    }

    let sortedUsers = [...users]; //trae el arreglo
    sortedUsers.sort((a, b) => {
        const lastNameA = a.lastName.toLowerCase();
        const lastNameB = b.lastName.toLowerCase();
    
        if (sortOrder === 'ASC') { //ordena entre ascendente y descendente
            return lastNameA.localeCompare(lastNameB);
        } else {
            return lastNameB.localeCompare(lastNameA);
        }
    });

    let startIndex = sortOrder === 'ASC' ? 0 : Math.max(sortedUsers.length - count, 0); //si es descendente, se calcula en función de la longitud total de la lista y la cantidad de usuarios a mostrar.
    let endIndex = Math.min(startIndex + count, sortedUsers.length);

    let limitedUsers = sortedUsers.slice(startIndex, endIndex);

    let output = 'Lista de usuarios:\n\n';
    limitedUsers.forEach(user => {
        output += `${user.firstName} ${user.lastName}\n`; //cada estudiante individualmente
    });

    res.type('text').send(output);
});

router.post('/', (req, res) => {
    const { name, lastName, email, city = 'Bogotá', country = 'Colombia' } = req.body; 

    // Verificar si se proporcionan nombre, apellido y correo
    if (!name || !lastName || !email) {
        return res.status(400).json({ error: 'No se puede crear el usuario porque falta nombre, apellido o correo.' });
    }

    const user = { //estructura de items de login
        name,
        lastName,
        email,
        city,
        country
    };

    res.status(201).json(user);
});

  
module.exports = router;