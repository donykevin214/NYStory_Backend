import storyCtrls from '~/controllers/story.controllers';
import validate from '~/lib/ajv';
import schema from '~/schemas';
import { validateProps } from '~/lib/ajv';
/**
 * @type { Routes.default }
 */

module.exports = {
    prefix: '/story',
    routes: [
        {
            path: '/getStoryData',
            methods: {
                post: {
                    middlewares: [
                        validate({ schema: schema.storySchema } as validateProps),
                        storyCtrls.getStoryData,
                    ],
                },
            },
        },
    ],
};
