import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import ConfirmedAccount from "../ConfirmedAccount";
import { server } from "../../mocks/server";

describe("<ConfirmedAccount />", () => {
    it("should render error message given that confirmation was not successful", async () => {
     server.use(
       rest.get("api/users/*", (req, res, ctx) => {
         return res(
           ctx.status(404),
           ctx.json({
             error: "Expired token or already confirmed",
           })
         );
       })
     );
     render(<ConfirmedAccount />);
     const errorEl = await screen.findByRole("alert");
     const mayHaveAlreadyBeenConfirmed = await screen.findByText(/already been confirmed/i)
     expect(errorEl).toBeInTheDocument();
     expect(errorEl).toHaveClass("error");
     expect(mayHaveAlreadyBeenConfirmed).toBeInTheDocument();
    });

    it("should render success message given that confirmation was successful", async () => {
      render(<ConfirmedAccount />);
      const success = await screen.findByText(/account has been confirmed/i);
      expect(success).toBeInTheDocument();
    });
})