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

const useRepoData = () => {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: fetcher,
  });
};

function Example() {
  const { isSuccess, data } = useRepoData();

  if (!isSuccess) {
    return <>"Loading..."</>;
  }

  return (
    <div>
      <h1>{data?.firstName}</h1>
      <p>{data?.lastName}</p>
    </div>
  );
}
