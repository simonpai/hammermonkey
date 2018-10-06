import {asSequence} from 'sequency';

Array.prototype.sequence = function() {
  return asSequence(this);
};
