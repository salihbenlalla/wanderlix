import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  $,
  type QRL
} from "@builder.io/qwik";
import { useNavigate } from '@builder.io/qwik-city';
import { ThemeContext } from "~/routes/layout";
import SearchIcon from "~/assets/icomoon_svg/search.svg?component";
import CloseButton from "~/assets/icomoon_svg/close.svg?component";
import { boolean, minLength, object, string } from "valibot";
import {
  useForm,
  valiForm$,
  reset,
  type SubmitHandler,
} from "@modular-forms/qwik";
import styles from "./style.css?inline";


export interface searchFormInput {
  searchQuery: string;
  searchTitlesOnly: boolean;
  [key: string]: string | boolean;
}

const searchFormSchema = object({
  searchQuery: string([
    minLength(1, "Please enter your search terms."),
  ]),
  searchTitlesOnly: boolean("this field should have a boolean value"),
});

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);


  const searchFormLoader = useSignal<searchFormInput>({
    searchQuery: "",
    searchTitlesOnly: true
  });

  const [searchForm, { Form, Field }] = useForm<searchFormInput>({
    loader: searchFormLoader,
    fieldArrays: [],
    validate: valiForm$(searchFormSchema),
  });

  const resetForm = $(() => {
    reset(searchForm);
  });

  const navigate = useNavigate()

  const themeContext = useContext(ThemeContext);

  const handleSubmit: QRL<SubmitHandler<searchFormInput>> = $(
    async (values, _ /*event*/) => {
      await navigate(`/search/${values.searchQuery}/?searchTitlesOnly=${values.searchTitlesOnly}`);
      resetForm();
      themeContext.searchPopupOpen = false;
    }
  );

  return (
    <div
      class={`search-popup${theme.searchPopupOpen === true ? " active" : ""}`}
    >
      <button
        type="button"
        class="btn-close "
        aria-label="Close"
        onClick$={() => (theme.searchPopupOpen = false)}
      >
        <CloseButton width="18" height="18" viewBox="0 0 20 20" />
      </button>
      <div class="search-content">
        <h3>Press ESC to close</h3>
        <Form onSubmit$={handleSubmit} id="searchform" class="search-form">

          <div class="search-inputs">
            <div class="search-input">
              <Field name="searchQuery">
                {(field, props) => {
                  return (
                    <>
                      <input
                        {...props}
                        value={field.value}
                        type="text"
                        id="search"
                        placeholder="What do you want to search for ?"
                        aria-describedby="search input"
                        required
                      />
                      <div class="search-form-error-message">
                        {field.error && <span>{field.error}</span>}
                      </div>
                    </>
                  )
                }}
              </Field>
            </div>

            <div class="search-checkbox">
              <Field name="searchTitlesOnly" type="boolean">
                {(field, props) => (
                  <>
                    <input
                      {...props}
                      checked={field.value}
                      type="checkbox"
                      id="searchTitlesOnly"
                      class={field.error ? "error" : ""}
                    />
                    <label for="searchTitlesOnly">
                      Search titles only
                    </label>
                    <div class="search-form-error-message">
                      {field.error && <span>{field.error}</span>}
                    </div>
                  </>
                )}
              </Field>
            </div>
          </div>

          <button type="submit">
            <SearchIcon width="16" height="16" viewBox="0 0 20 20" />
          </button>

          { /*<input
              type="text"
              name="q"
              id="search"
              placeholder="What do you want to search for ?"
              value={inputValue.value}
            />*/ }
        </Form>
      </div>
    </div>
  );
});
