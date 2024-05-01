module.exports = async ({github, context, core}) => {
    const { owner, repo } = context.repo;
    const acceptLabel = "Status: Accepted";

    // Get dates for last month
    const first_day = new Date();
    first_day.setMonth(first_day.getMonth() - 1);
    first_day.setDate(1);

      // Query all issues created in the last month
     const lastMonthIssuesResponse = await github.rest.issues.listForRepo({
        owner,
        repo,
        since: first_day.toISOString().slice(0, 10),
        state: 'all'
     });

    const lastMonthIssues = lastMonthIssuesResponse.data;

    // Filter the last month issues to find accepted issues
    const acceptedIssues = lastMonthIssues.filter(issue => {
        return issue.labels.some(label => label.name === acceptLabel);
    });

    const totalIssues = lastMonthIssues.length;
  
    // Calculate the percentage of accepted issues
    const percentage = ((acceptedIssues.length / totalIssues) * 100).toFixed(2);

    console.log(`Percentage of accepted issues in the last month: ${percentage}%`);

    return percentage;
};
