import React from 'react';

const guidelines = [
  {
    link: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
    text: 'Creating Helpful Content guidelines (By Google)',
  },
  {
    link: 'https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews',
    text: 'Write High-Quality Reviews (By Google)',
  },
  {
    link: 'https://services.google.com/fh/files/misc/hsw-sqrg.pdf',
    text: 'Search Quality Rater Guidlines (By Google)',
  },
  {
    link: 'https://surferseo.com/blog/content-score-product-update/',
    text: 'Content Score Guidlines (By SurferSEO)',
  }
];

const GuidelinesTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Guidelines</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {guidelines.map((item, index) => (
            <tr key={index}>
              <td>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guideline-link"
                >
                  {item.text}
                </a>
              </td>
              <td>
                <span role="img" aria-label="Green Tick" className="green-tick">
                  ✅
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <style jsx>{`
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
  
          th {
            background-color: #f2f2f2;
            text-align: left;
            padding: 8px;
          }
  
          td {
            border-top: 1px solid #ddd;
            padding: 8px;
          }
  
          .guideline-link {
            text-decoration: none;
            color: #0070f3;
          }
  
          .guideline-link:hover {
            text-decoration: underline;
          }
  
          .green-tick {
            font-size: 1.2em;
            color: #4caf50;
          }
        `}</style>
      </table>
    );
  };

export default GuidelinesTable;
