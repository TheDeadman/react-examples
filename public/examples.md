The problem ultimately comes down to passing around functions, objects, or arrays. Creating any of these within the body of a component or a function that is called within the body of a component (e.g. a custom hook) will cause them to be recreated each time their creator re-renders unless they are initialized / managed via some type of state management or optimized with `useMemo`, `useCallback`, etc.
Here are a few examples of spots that are potential causes of unnecessary renders and broken memoization.

1. `getProfile` in `useRenterProfileHelper`. In `DriverSearch.tsx`, `getFullRenterProfile` will never actually memoize because one of the dependencies is `getProfile` which is returned as a new object (function) each time `useRenterProfileHelper` is called in `DriverSearch`. This is used in turn for memoization of other functions. When we have `useCallback` or `useMemo`, we need to walk all the way up the dependency trees to make sure that we don't have some high level dependency that is breaking the memos.

2. `useCurrentTicketFlow` in `rentalEditorSlice`. This selector creates / returns a new object everytime it runs. If you have a component that is using `useCurrentTicketFlow`, the component will re-render when there is an update to the rental editor state even if `rentalAgreementStatus` does not change and there is no change to the returned value of useCurrentTicketFlow. If we wanted to keep this selector but optimize it somewhat, you would change it to the following example. This will make it so that the components using this selector will only re-render if the returned value from `selectRentalAgreementStatus` changes. If you wanted to optimize it further on an individual return value basis, you would need to create individual selectors for each.

```js
export const useCurrentTicketFlow = createSelector([selectRentalAgreementStatus], (rentalAgreementStatus) => {
    const savedRAStatus = parseSimpleUrn(rentalAgreementStatus);

    return {
        isModifyFlow: savedRAStatus === "OPEN",
        isResFlow: !savedRAStatus,
        isIncompleteFlow: savedRAStatus === "INCOMPLETE"
    }
})
```

3. The `usePaymentHistoryHelper` is returning a new object every time it gets called, `return { retrievePaymentHistory }`. `retrievePaymentHistory` is already memoized with `useCallback` so anything referencing it using `const { retrievePaymentHistory } = usePaymentHistoryHelperHook();` will be able to memoized assuming memoization is not broken higher up the chain. However, this hook is still creating a new object in memory everytime it gets called. That object contains a reference to the `retrievePaymentHistory` function. If the component gets rendered 5 times in a row, then it will have 5 separate objects that point to the same thing and need to get garbage collected. If the hook were to be used in repeated components on the page, then there would be duplicate objects that can't be garbage collected until the components are destroyed.

4. `launchQSP` in `useLaunchQSP` cannot be memoized because of `usePrimaryDriver` will always return a new object if it does not return undefined. This could also be addressed with createSelector.
