import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

type Response = { firstName: string; lastName: string };

const fetcher = (): Promise<Response> => {
  return new Promise((resolve) =>
    setTimeout(resolve, 2000, { firstName: "alejandro", lastName: "nanez" })
  );
};

type SelectFn<T extends any> = (arg: Response) => T;
const useRepoData = <T extends any>(theSelectorFn: SelectFn<T>) => {
  return useQuery<Response, unknown, T>(["repoData"], fetcher, {
    select: theSelectorFn,
  });
};

type SelectorResponse = { justTheFirstName: string };
const theSelectorFn = (data: Response) => ({
  justTheFirstName: data.firstName,
});

function Example() {
  // data: SelectorResponse | undefined
  const { isSuccess, data } = useRepoData<SelectorResponse>(theSelectorFn);

  if (!isSuccess) {
    return <>"Loading..."</>;
  }

  return (
    <div>
      <h1>{data?.justTheFirstName}</h1>
    </div>
  );
}
