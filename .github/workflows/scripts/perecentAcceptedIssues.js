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
    const totalIssues = 20;
    console.debug(`totalIssues in the last month: ${totalIssues}%`);

    console.debug(`Percentage of accepted issues in the `);
    return { 
        number : totalIssues
    };
}
