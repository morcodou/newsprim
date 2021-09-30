import { shield, rule } from "graphql-shield";
import * as _ from 'lodash';

const rules = {
    isAuthenticated: rule()
        (
            (_parent, _args, context) => _.isEmpty(context.user) ? false : true
        )
}

export const permissions = shield({
    Query: {
        hello: rules.isAuthenticated,
    }
})