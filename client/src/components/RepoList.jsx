import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Description</th>
          <th>Fork Count</th>
          <th>Star- gazers</th>
          <th>Last Update</th>
          <th>Is Fork</th>
        </tr>
        {props.repos.map((repo, index) => (
<tr key={index}>
  <td>{repo.name}</td>
  <td>{1}</td>
  <td>{repo.description}</td>
  <td>{repo.forks_count}</td>
  <td>{repo.stargazers_count}</td>
  <td>{repo.updated_at}</td>
  <td>{repo.fork}</td>
</tr>
          ))}
      </tbody>
    </table>

  </div>
)

export default RepoList;