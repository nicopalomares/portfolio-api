'use strict';

const { pop } = require('../../../../config/middlewares');

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({

    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          Tool: {
            populate: ['icon'],
          },
          Images: true    ,
          Company: {
            populate: ['icon'],
          }
        },
      };

      const { data, meta } = await super.find(ctx);

      const sanitizedData = data.map((item) => {
        let { id, Images, Tool, Title , Company ,documentId ,Description ,Year } = item;
        if(Company!== null){
          Company.icon = Company.icon?.url || "";
        }else {
          Company = {
            name: "",
            icon: "",
          }
        }

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
            documentId,
            title: Title,
            images: sanitizedImages,
            tool: sanitizedTools,
            company: Company,
            description: Description,
            year: Year || "",

        };


      });
      return { data : sanitizedData};
    },


  }));