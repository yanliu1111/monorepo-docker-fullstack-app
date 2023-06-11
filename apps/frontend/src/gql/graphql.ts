/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
  __typename?: "Query";
  submissions: Array<Submission>;
};

export type Submission = {
  __typename?: "Submission";
  data: Scalars["JSON"];
  id: Scalars["ID"];
  submittedAt: Scalars["DateTime"];
};

// Scalars means that the type is a primitive type

export type SubmissionsQueryVariables = Exact<{ [key: string]: never }>;

export type SubmissionsQuery = {
  __typename?: "Query";
  submissions: Array<{
    __typename?: "Submission";
    id: string;
    submittedAt: any;
    data: any;
  }>;
};

export const SubmissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Submissions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submissions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
                { kind: "Field", name: { kind: "Name", value: "data" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmissionsQuery, SubmissionsQueryVariables>;
