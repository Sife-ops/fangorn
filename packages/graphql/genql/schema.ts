export type Scalars = {
    String: string,
    ID: string,
    Boolean: boolean,
}

export interface Mutation {
    mello: Scalars['String']
    search: User[]
    __typename: 'Mutation'
}

export interface Query {
    hello: Scalars['String']
    viewer: User
    __typename: 'Query'
}

export interface User {
    avatar: Scalars['String']
    createdAt: Scalars['String']
    cursor?: Scalars['String']
    description?: Scalars['String']
    discriminator?: Scalars['String']
    displayName: Scalars['String']
    lastSeen: Scalars['String']
    userId?: Scalars['ID']
    username?: Scalars['String']
    visible: Scalars['Boolean']
    __typename: 'User'
}

export interface MutationGenqlSelection{
    mello?: boolean | number
    search?: (UserGenqlSelection & { __args: {input: SearchInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    hello?: boolean | number
    viewer?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SearchInput {cursor?: (Scalars['String'] | null),gender?: (Scalars['String'] | null)}

export interface UserGenqlSelection{
    avatar?: boolean | number
    createdAt?: boolean | number
    cursor?: boolean | number
    description?: boolean | number
    discriminator?: boolean | number
    displayName?: boolean | number
    lastSeen?: boolean | number
    userId?: boolean | number
    username?: boolean | number
    visible?: boolean | number
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
    