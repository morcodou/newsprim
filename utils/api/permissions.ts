import { shield, rule } from "graphql-shield";
import * as _ from 'lodash';

const rules = {
    isAuthenticated: rule()(async (_parent, _args, context) => {
        // return _.isEmpty(context.user) ? false : true
        return _.isEmpty(context.user) ? true : true
    })
}

export const permissions = shield({
    Query: {
        hello: rules.isAuthenticated,
    }
})