export type Scalars = {
    String: string,
    Boolean: boolean,
}

export interface Mutation {
    mello: Scalars['String']
    __typename: 'Mutation'
}

export interface Query {
    hello: Scalars['String']
    __typename: 'Query'
}

export interface MutationGenqlSelection{
    mello?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    hello?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    