'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
    async find(ctx) {
      // Llamamos al controlador core con populate=* por defecto
      ctx.query = {
        ...ctx.query,
        populate: {
          Tool: {
            populate: ['icon'],
          },
          Images: true    ,
        Company:true    },
      };

      const { data, meta } = await super.find(ctx);
      const sanitizedData = data.map((item) => {
        const { id, Images, Tool, Title , Company} = item;
        console.log(Company)

        const sanitizedImages = Images?.map((image) => {
          const { id , formats} = image;
          let url = image.url;
          return {
            id,
            url,
          };
        })
        const sanitizedTools =  Tool.map((image) => {

            const { id , name , icon} = image;
            let url = icon.url;
            return {
              id,
              name,
              url
            };
          })
        return {
            id,
            title: Title,
            images: sanitizedImages,
            tool: sanitizedTools,
            company: Company?.url
        };


      });
      return { data : sanitizedData};
    },
  }));