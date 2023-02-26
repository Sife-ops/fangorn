export type Scalars = {
    String: string,
    Boolean: boolean,
    ID: string,
}

export interface Mutation {
    mello: Scalars['String']
    __typename: 'Mutation'
}

export interface Query {
    hello: Scalars['String']
    viewer: User
    __typename: 'Query'
}

export interface User {
    active: Scalars['Boolean']
    avatar: Scalars['String']
    discriminator: Scalars['String']
    userId: Scalars['ID']
    username: Scalars['String']
    __typename: 'User'
}

export interface MutationGenqlSelection{
    mello?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    hello?: boolean | number
    viewer?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserGenqlSelection{
    active?: boolean | number
    avatar?: boolean | number
    discriminator?: boolean | number
    userId?: boolean | number
    username?: boolean | number
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
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    