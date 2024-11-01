import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { Link, useLocation } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";
import isNumber from "~/lib/helpers/isNumber";
import splitStringWithoutEmpty from "~/lib/helpers/splitStringWithoutEmpty";

interface PaginationButtonsProps {
  pageNumber: number;
  totalPages: number;
}

export default component$<PaginationButtonsProps>((props) => {
  useStyles$(styles);
  const loc = useLocation();

  let pathname: string | string[] = splitStringWithoutEmpty(
    loc.url.pathname,
    "/"
  );
  pathname = isNumber(pathname[pathname.length - 1])
    ? "/" + pathname.slice(0, pathname.length - 1).join("/") + "/"
    : "/" + pathname.join("/") + "/";

  const searchParams = loc.url.searchParams;

  return (
    <>
      {props.totalPages > 1 && (
        <nav class="pagination-buttons">
          <ul>
            {props.pageNumber > 2 && (
              <li key={uuidv4()}>
                <a
                  class="page-number"
                  href={`${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`}
                >
                  «
                </a>
              </li>
            )}
            {props.pageNumber > 1 && (
              <li key={uuidv4()}>
                <a
                  class="page-number"
                  href={`${pathname}${props.pageNumber - 1 !== 1 ? `${props.pageNumber - 1}/` : ""}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`}
                >
                  {props.pageNumber - 1}
                </a>
              </li>
            )}
            <li key={uuidv4()}>
              <span class="page-number current">{props.pageNumber}</span>
            </li>
            {props.pageNumber !== props.totalPages && (
              <li key={uuidv4()}>
                <a
                  class="page-number"
                  href={`${pathname}${props.pageNumber + 1}/${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`}
                >
                  {props.pageNumber + 1}
                </a>
              </li>
            )}
            {props.pageNumber < props.totalPages - 1 && (
              <li key={uuidv4()}>
                <a
                  class="page-number"
                  href={`${pathname}${props.totalPages}/${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`}
                >
                  »
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
});
