const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required.'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().min(0).max(180),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Crime','Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {required_error: 'Movie gnre is required',
        invalid_type_error: 'Movie genre must be an array of string'
        }
    ),
})

function validateMovie (object){
    return movieSchema.safeParse(object); // safeParse devuelve un obj resoult que te indica si hay datos o si hay error
}

function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object); // .partial() vuelve opcionales todos los campis, si está lo actualiza, sino no pasa nada
}

module.exports = {
    validateMovie,
    validatePartialMovie
}