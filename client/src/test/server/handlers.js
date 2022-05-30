import { rest } from "msw";

const handlers = [
  rest.get("/api/v1/jobs", (req, res, ctx) => {
    const mockApiResponse = {
      nHits: 1,
      nPages: 1,
      jobs: [
        {
          _id: "628c9be5d010db4681db9410",
          company: "Twitter",
          position: "Software Engineer",
          status: "declined",
          jobType: "part-time",
          jobLocation: "Texas",
          createdBy: "627aa98dc6b16a5cb960ddce",
          createdAt: "2022-05-24",
          updatedAt: "2022-05-24",
        },
      ],
    };
    return res(ctx.json(mockApiResponse));
  }),
];

export default handlers;
