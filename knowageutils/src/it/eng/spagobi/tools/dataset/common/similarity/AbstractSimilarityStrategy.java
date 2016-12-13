/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 *
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package it.eng.spagobi.tools.dataset.common.similarity;

import gnu.trove.iterator.TLongIterator;
import gnu.trove.set.hash.TLongHashSet;

import java.math.BigDecimal;
import java.math.RoundingMode;

public abstract class AbstractSimilarityStrategy implements ISimilarityStrategy {

	private final static int DEFAULT_DECIMALS = 2;

	@Override
	public abstract double measureCoefficient(TLongHashSet setA, TLongHashSet setB);

	protected int notIntersectCount(TLongHashSet setA, TLongHashSet setB) {
		int count = 0;
		TLongIterator it = setA.iterator();
		while (it.hasNext()) {
			if (!setB.contains(it.next())) {
				count++;
			}
		}
		it = setB.iterator();
		while (it.hasNext()) {
			if (!setA.contains(it.next())) {
				count++;
			}
		}
		return count;
	}

	protected int intersectCount(TLongHashSet setA, TLongHashSet setB) {
		TLongHashSet a;
		TLongHashSet b;
		if (setA.size() <= setB.size()) {
			a = setA;
			b = setB;
		} else {
			a = setB;
			b = setA;
		}
		int count = 0;
		TLongIterator it = a.iterator();
		while (it.hasNext()) {
			if (b.contains(it.next())) {
				count++;
			}
		}
		return count;
	}

	public double round(double value, int places) {
		if (places < 0)
			throw new IllegalArgumentException();

		BigDecimal bd = new BigDecimal(value);
		bd = bd.setScale(places, RoundingMode.HALF_UP);
		return bd.doubleValue();
	}

	public double round(double value) {
		return round(value, DEFAULT_DECIMALS);
	}
}
