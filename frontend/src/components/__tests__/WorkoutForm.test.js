import WorkoutForm from "../WorkoutForm";
import App from "../../mocks/App";
import user from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { Provider } from "react-redux";
import store from "../../redux/store";

let dispatch;
let mockUser = {
  id: "userid",
  email: "keech@mail.yu",
  token: "authorizationToken",
  username: undefined,
  profileImg: undefined,
  tokenExpires: Date.now() + 3600000,
};

beforeAll(() => (dispatch = store.dispatch));
beforeEach(() => dispatch({ type: "LOGIN", payload: mockUser }));
afterEach(() => {
  dispatch({ type: "RESET_WORKOUTS_STATE" });
  act(() => dispatch({ type: "LOGOUT" }));
});
afterAll(() => {
  dispatch = null;
  mockUser = null;
});

describe("<WorkoutForm/>", () => {
  it("should render Workout form given that user is authenticated", async () => {
    render(
      <Provider store={store}>
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const closeForm = screen.getByText("close");
    const submit = screen.getByText(/add/i);
    expect(titleInput).toBeInTheDocument();
    expect(muscleGroupSelect).toBeInTheDocument();
    expect(repsInput).toBeInTheDocument();
    expect(loadInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(closeForm).toBeInTheDocument();
  });

  it("should focus input fields in the right order", async () => {
    user.setup();
    render(
      <Provider store={store}>
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const closeForm = screen.getByText("close");
    const submit = screen.getByText(/add/i);
    await user.tab();
    expect(closeForm).toHaveFocus();
    await user.tab();
    expect(titleInput).toHaveFocus();
    await user.tab();
    expect(muscleGroupSelect).toHaveFocus();
    await user.tab();
    expect(repsInput).toHaveFocus();
    await user.tab();
    expect(loadInput).toHaveFocus();
    await user.tab();
    expect(submit).toHaveFocus();
  });

  it("should update input/select value when user types/selects", async () => {
    user.setup();
    render(
      <Provider store={store}>
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    await user.type(titleInput, "squats");
    await user.selectOptions(muscleGroupSelect, "leg");
    await user.type(repsInput, "30");
    await user.type(loadInput, "22");
    expect(titleInput).toHaveValue("squats");
    expect(muscleGroupSelect).toHaveValue("leg");
    expect(repsInput).toHaveValue(30);
    expect(loadInput).toHaveValue(22);
  });

  it("should signal input error when input value(s) are missing", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API}/api/workouts`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "Please fill out the empty fields",
            })
          );
        }
      )
    );
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    let titleInput = screen.getByTestId("title");
    let muscleGroupSelect = screen.getByTestId("muscle_group");
    let repsInput = screen.getByTestId("reps");
    let loadInput = screen.getByTestId("load");
    let submit = screen.getByText(/add/i);
    await user.type(titleInput, "squats");
    await user.selectOptions(muscleGroupSelect, "");
    await user.type(repsInput, " ");
    await user.type(loadInput, "22");
    await user.click(submit);
    titleInput = await screen.findByTestId("title");
    muscleGroupSelect = await screen.findByTestId("muscle_group");
    repsInput = await screen.findByTestId("reps");
    loadInput = await screen.findByTestId("load");
    expect(titleInput).not.toHaveAttribute("class", "error");
    expect(muscleGroupSelect).toHaveAttribute("class", "error");
    expect(repsInput).toHaveAttribute("class", "error");
    expect(loadInput).not.toHaveAttribute("class", "error");
    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/please fill out the empty fields/i);
    expect(error).toHaveAttribute("class", "error flashMessage");
  });

  it("should signal input error when title is too long", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API}/api/workouts`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "Title too long - max 30 characters",
            })
          );
        }
      )
    );
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    let titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const submit = screen.getByText(/add/i);
    await user.type(
      titleInput,
      "adasdaasdsdfsdfdddfdfsdfsfsdfsfddsfsfsfsdfterttrtee"
    );
    await user.selectOptions(muscleGroupSelect, "biceps");
    await user.type(repsInput, "22");
    await user.type(loadInput, "22");
    await user.click(submit);
    titleInput = await screen.findByTestId("title");
    expect(titleInput).toHaveAttribute("class", "error");
    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument()
    expect(error.textContent).toMatch(/max 30 characters/i);
    expect(error).toHaveAttribute("class", "error flashMessage");
  });

  it("should signal input error if title contains non-alphabetic characters", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API}/api/workouts`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "Title may contain only letters",
            })
          );
        }
      )
    );
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    let titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const submit = screen.getByText(/add/i);
    await user.type(titleInput, "66768^&^*&%<>*");
    await user.selectOptions(muscleGroupSelect, "biceps");
    await user.type(repsInput, "22");
    await user.type(loadInput, "22");
    await user.click(submit);
    titleInput = await screen.findByTestId("title");
    expect(titleInput).toHaveAttribute("class", "error");
    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/may contain only letters/i);
    expect(error).toHaveAttribute("class", "error flashMessage");
  });

  it("should signal input error if reps value is too large", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API}/api/workouts`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "Reps value too large",
            })
          );
        }
      )
    );
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    let repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const submit = screen.getByText(/add/i);
    await user.type(titleInput, "arm curls");
    await user.selectOptions(muscleGroupSelect, "biceps");
    await user.type(repsInput, "23848394829");
    await user.type(loadInput, "22");
    await user.click(submit);
    repsInput = await screen.findByTestId("reps");
    expect(repsInput).toHaveAttribute("class", "error");
    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/reps value too large/i);
    expect(error).toHaveAttribute("class", "error flashMessage");
  });

  it("should signal input error when load value is too large", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API}/api/workouts`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "Load value too large",
            })
          );
        }
      )
    );
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    let loadInput = screen.getByTestId("load");
    const submit = screen.getByText(/add/i);
    await user.type(titleInput, "arm curls");
    await user.selectOptions(muscleGroupSelect, "biceps");
    await user.type(repsInput, "22");
    await user.type(loadInput, "284738378");
    await user.click(submit);
    loadInput = await screen.findByTestId("load");
    expect(loadInput).toHaveAttribute("class", "error");
    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/load value too large/i);
    expect(error).toHaveAttribute("class", "error flashMessage");
  });

  it("should respond with error if user is not authorized", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API}/api/workouts`,
        (req, res, ctx) => {
          return res(
            ctx.status(401),
            ctx.json({
              error: "Not authorized",
            })
          );
        }
      )
    );
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const submit = screen.getByText(/add/i);
    await user.type(titleInput, "arm curls");
    await user.selectOptions(muscleGroupSelect, "biceps");
    await user.type(repsInput, "33");
    await user.type(loadInput, "20");
    await user.click(submit);
    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toMatch(/not authorized/i);
    expect(error).toHaveAttribute("class", "error flashMessage");
  });

  it("should respond with success if input is valid and user authorized", async () => {
    user.setup();
    render(
      <Provider store={store}>
        <App />
        <WorkoutForm />
      </Provider>
    );
    const titleInput = screen.getByTestId("title");
    const muscleGroupSelect = screen.getByTestId("muscle_group");
    const repsInput = screen.getByTestId("reps");
    const loadInput = screen.getByTestId("load");
    const submit = screen.getByText(/add/i);
    await user.type(titleInput, "arm curls");
    await user.selectOptions(muscleGroupSelect, "biceps");
    await user.type(repsInput, "33");
    await user.type(loadInput, "20");
    await user.click(submit);
    const success = await screen.findByRole("alert");
    expect(success).toBeInTheDocument();
    expect(success.textContent).toMatch(/successfully created workout/i);
    expect(success).toHaveAttribute("class", "success flashMessage");
  });
});
