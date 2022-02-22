import { PageOptionsParams } from "../model/Pagination";

export const setupLimitAndPageErrorsCase = (options: PageOptionsParams) => {


    const opt = {
        limit: Number(options.limit),
        page: Number(options.page),
    }

    return {
        cases: {
            bothLowerThanOne: opt.limit < 1 && opt.page < 1,
            limitLowerThanOne: opt.limit < 1,
            pageLowerThanOne: opt.page < 1,
        },
        messages: [
            {
                message: `valor do parâmetro para o limite e pagina inválidos (mínimo 1)`, details: {
                    'min': 1,
                    'received': opt

                }
            },
            {
                message: `valor do parâmetro para o limite por página inválido (mínimo 1)`,
                details: {
                    'min': 1,
                    'received': { limit: opt.limit }
                }
            },
            {
                message: `valor do parâmetro para a página inválido (mínimo 1)`,
                details: {
                    'min': 1,
                    'received': { limit: opt.page }
                }

            }
        ]
    }
}
