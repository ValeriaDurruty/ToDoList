
const pool = require('../database');

// Listar todas las tareas
exports.listTareas = async (req, res) => {
    const { id } = req.params;

    try {
        const tareas = await pool.query(`
            SELECT t.*, e.nombre AS Estado, p.nombre AS Prioridad, c.nombre AS Categoria
            FROM Tarea t
            JOIN Usuario u ON t.FK_Usuario = u.PK_Usuario
            JOIN Estado e ON t.FK_Estado = e.PK_Estado
            JOIN Prioridad p ON t.FK_Prioridad = p.PK_Prioridad
            JOIN Categoria c ON t.FK_Categoria = c.PK_Categoria
            WHERE u.PK_Usuario = ?`, [id]);

        if (tareas.length === 0) {
            res.json({ message: 'No hay tareas' });
        } else {
            // Formatear las fechas de las tareas
            const tareasFormateadas = tareas.map(tarea => {
                tarea.fecha_creacion = new Date(tarea.fecha_creacion).toLocaleDateString('es-ES');
                tarea.fecha_limite = new Date(tarea.fecha_limite).toLocaleDateString('es-ES');
                return tarea;
            });
            res.json(tareasFormateadas);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

// Agregar una nueva tarea
exports.addTarea = async (req, res) => {
    const { titulo, descripcion, fecha_creacion, fecha_limite, FK_Usuario, FK_Estado, FK_Prioridad, FK_Categoria } = req.body;

    // Validar que los campos no estén vacíos
    if (!titulo || !descripcion || !fecha_creacion || !fecha_limite || !FK_Usuario || !FK_Estado || !FK_Prioridad || !FK_Categoria) {
        res.status(400).json({ message: 'Todos los campos son requeridos' });
    };

    try {
        const nuevaTarea = { titulo, descripcion, fecha_creacion, fecha_limite, FK_Usuario, FK_Estado, FK_Prioridad, FK_Categoria };
        const tarea = await pool.query('INSERT INTO Tarea SET ?', [nuevaTarea]);
        if (tarea.affectedRows === 0) {
            res.json({ message: 'Error al agregar tarea' });
        } else {
            res.json({ message: 'Tarea agregada correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar tarea' });
    }
};

// Obtener una tarea por su ID
exports.getTareaById = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await pool.query(`
            SELECT t.*, e.nombre AS Estado, p.nombre AS Prioridad, c.nombre AS Categoria
            FROM Tarea t
            JOIN Usuario u ON t.FK_Usuario = u.PK_Usuario
            JOIN Estado e ON t.FK_Estado = e.PK_Estado
            JOIN Prioridad p ON t.FK_Prioridad = p.PK_Prioridad
            JOIN Categoria c ON t.FK_Categoria = c.PK_Categoria WHERE PK_Tarea = ?`, [id]);
            
        if (tarea && tarea.length === 0) {
            res.json({ message: 'Tarea no encontrada' });
        } else {
            // Formatear las fechas
            tarea[0].fecha_creacion = new Date(tarea[0].fecha_creacion).toLocaleDateString('es-ES');
            tarea[0].fecha_limite = new Date(tarea[0].fecha_limite).toLocaleDateString('es-ES');

            res.json(tarea[0]);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tarea' });
    }
};

// Editar una tarea
exports.editTarea = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_limite, FK_Usuario, FK_Estado, FK_Prioridad, FK_Categoria } = req.body;

    // Validar que los campos no estén vacíos
    if (!titulo || !descripcion || !fecha_limite || !FK_Usuario || !FK_Estado || !FK_Prioridad || !FK_Categoria) {
        res.status(400).json({ message: 'Todos los campos son requeridos' });
    };

    try {
        const edit_tarea = { titulo, descripcion, fecha_limite, FK_Usuario, FK_Estado, FK_Prioridad, FK_Categoria };
        const tarea = await pool.query('UPDATE Tarea SET ? WHERE PK_Tarea = ?', [edit_tarea, id]);
        if (tarea && tarea.affectedRows === 0) {
            res.json({ message: 'Tarea no encontrada' });
        } else {
            res.json({ message: 'Tarea actualizada correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar tarea' });
    }
};

// Eliminar una tarea
exports.deleteTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await pool.query('DELETE FROM Tarea WHERE PK_Tarea = ?', [id]);
        if (tarea.affectedRows === 0) {
            res.json({ message: 'Tarea no encontrada' });
        } else {
            res.json({ message: 'Tarea eliminada correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar tarea' });
    }
};