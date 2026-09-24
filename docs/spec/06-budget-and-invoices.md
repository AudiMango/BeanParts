# Budget and Invoices

Project budgets, invoices, and how spending is recorded.

## Invoices

Invoices are uploaded as PDFs and attached to an order. An order can have **multiple invoices**. After an upload, BeanPARTS shows a short form:

```
Invoice Number
Invoice Date
Subtotal
Shipping
Tax
Total
Notes
```

## Project Budgets

Each project has its own budget. Projects do not share budgets.

```
2027 Onseason Robot

Budget:     $15,000
Spent:       $4,820
Remaining:  $10,180
```

## Budget Rules

- **Spending is recorded from invoices only.** *Spent* updates when an invoice is uploaded and its amounts are entered. Submitting or accepting a request, or placing an order, does not change it.
- **Shipping and tax count** against the budget:
  ```
  Parts:     $200
  Shipping:   $15
  Tax:        $12
  Budget Impact: $227
  ```
- **Multiple invoices add up.** Each invoice keeps its own amounts and PDF:
  ```
  Order #42
  Invoice A: $300
  Invoice B: $100
  Total Budget Impact: $400
  ```
- **Multi-project invoices split automatically.** Each project is charged for its own line items; shipping and tax are split in proportion to each project's line cost.
- **Corrections replace, not double-count.** If invoice details are corrected, the budget updates to the new value.
