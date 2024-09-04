const z = require('zod');

const itemSchema = z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    }).min(1, { message: 'Name cannot be empty' }),
    power: z.string().min(1, { message: 'Power cannot be empty' }),
    real_name: z.string().min(1, { message: 'Real name cannot be empty' }),
    // type: z.string().min(1, { message: 'Type cannot be empty' }),
    type: z.array(z.string()).min(1, { message: 'Type cannot be empty' }),
    avatar: z.string().url({ message: 'Avatar must be a valid URL' }).min(1, { message: 'Avatar cannot be empty' })
  });

function validateItem(object) {
  return itemSchema.safeParse(object); // return itemSchema.parse(item); safe, devuelve un objt result con un error o no
}

function validatePartialItem(object) {
  return itemSchema.partial().safeParse(object); // partial, todos y cada una de las propiedades son opcionales, si existe alguna propiedad, debe cumplir con las reglas del esquema
}

module.exports = { validateItem, validatePartialItem};