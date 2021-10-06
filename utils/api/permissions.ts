import { rule, shield } from 'graphql-shield';
import * as _ from 'lodash';

const rules = {
  isAuthenticated: rule()((_parent, _args, context) => {
      console.log('Acontext.user');
      console.log(context.user);
      console.log('Bcontext.user');
      
    return _.isEmpty(context.user) ? false : true;
  }),
};

export const permissions = shield({
  Query: {
    savedArticle: rules.isAuthenticated,
    savedArticles: rules.isAuthenticated,
  },
  Mutation: {
    createFeed: rules.isAuthenticated,
    createBundle: rules.isAuthenticated,
    likeFeed: rules.isAuthenticated,
    updateFeed: rules.isAuthenticated,
    updateBundle: rules.isAuthenticated,
    createSavedArticle: rules.isAuthenticated,
    deleteBundle: rules.isAuthenticated,
    deleteFeed: rules.isAuthenticated,
    deleteSavedArticle: rules.isAuthenticated,
  },
});

// import { shield, rule } from "graphql-shield";
// import * as _ from 'lodash';

// const rules = {
//     isAuthenticated: rule()
//         (
//             (_parent, _args, context) => _.isEmpty(context.user) ? false : true
//         )
// }

// export const permissions = shield({
//     Query: {
//         hello: rules.isAuthenticated,
//     }
// })