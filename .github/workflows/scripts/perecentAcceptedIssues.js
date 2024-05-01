module.exports = async ({github, context, core}) => {
    const { owner, repo } = context.repo;
    const acceptLabel = "Status: Accepted";

    console.debug(`entering the java script file`);
                
      // Query all issues created in the last month
     const lastMonthIssuesResponse = await github.rest.issues.listForRepo({
        owner,
        repo
     });

    const lastMonthIssues = lastMonthIssuesResponse.data;

    // Filter the last month issues to find accepted issues
    const acceptedIssues = lastMonthIssues.filter(issue => {
        return issue.labels.some(label => label.name === acceptLabel);
    });

    const totalIssues = lastMonthIssues.length;

    console.debug(`totalIssues in the last month: ${totalIssues}%`);
  
    // Calculate the percentage of accepted issues
    const percentage = ((acceptedIssues.length / totalIssues) * 100).toFixed(2);

    console.debug(`Percentage of accepted issues in the last month: ${percentage}%`);
    return totalIssues;
};
