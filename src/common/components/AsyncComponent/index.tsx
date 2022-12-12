import Loadable, {
  DefaultComponent,
  LoadableComponent,
} from '@loadable/component';

const AsyncComponent = (
  promise: Promise<unknown>
): LoadableComponent<unknown> => {
  return Loadable(() =>
    promise.then(
      (result) =>
        new Promise((resolve) =>
          setTimeout(() => resolve(result as DefaultComponent<unknown>), 1000)
        )
    )
  );
};

export default AsyncComponent;
